import getConfigQueue from '~/config/queue';
import client, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { IEvent } from '~/interfaces/IEvent';
import Utils from '~/utils/Utils';
import EventDTO from '~/dto/EventDTO';
import { injectable, singleton } from 'tsyringe';
import RabbitMQService from '~/services/RabbitMQService';

@singleton()
class RabbitMQServiceImpl implements RabbitMQService {
    private connection!: Connection;
    private connected!: boolean;

    wasConnected(): boolean {
        return this.connected;
    }

    constructor() {
        console.log('constructor RabbitMQService');
        this.connect();
    }

    async connect(): Promise<void> {
        if (this.connection) return;
        while (true) {
            try {
                console.log('⌛️ Connecting to Rabbit-MQ Server');
                this.connection = await client.connect(`amqp://${getConfigQueue().user}:${getConfigQueue().password}@${getConfigQueue().host}:${getConfigQueue().port}/${getConfigQueue().vhost}`);
                this.connected = true;
                console.log('✅ Rabbit MQ Connection is ready');
                break;
            } catch (error) {
                console.error(error);
                console.error('Not connected to MQ Server');
                
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }

    async getPublishChannel(event: IEvent): Promise<Channel> {
        const channel = await this.connection.createChannel();
        channel.assertExchange(event.getExchange(), event.getExchangeType(), { durable: true });

        return channel;
    }

    async getConsumeChannel(event: IEvent): Promise<Channel> {
        const channel = await this.connection.createChannel();
        channel.assertQueue(event.getQueueName(), { durable: true });
        console.log('this.getExchange(event)',  event.getExchange());
        console.log('event.getRoutingKey()', event.getRoutingKey());
        console.log('event.getExchangeType()', event.getExchangeType());
        channel.assertExchange(event.getExchange(), event.getExchangeType(), { durable: true });
        channel.bindQueue(event.getQueueName(), event.getExchange(), event.getRoutingKey());
        // channel.prefetch(10);

        return channel;
    }

    async publishEvent(event: IEvent): Promise<void> {
        const channel = await this.getPublishChannel(event);
        channel.publish(event.getExchange(), event.getRoutingKey(), event.getData());
        channel.close();
    }

    async consumeEvent(event: IEvent, callback: (channel: Channel, message: ConsumeMessage | null) => void): Promise<void> {
        const channel = await this.getConsumeChannel(event);
        console.log('this.getConsumerQueue(event)', event.getQueueName());
        channel.consume(event.getQueueName(), (message) => callback(channel, message), { noAck: false });
    }

    consumeExchange(exchange: string, queueName: string, callback: (channel: Channel, message: ConsumeMessage | null) => void): void {
        const event = this.parseExchange(exchange, queueName);
        this.consumeEvent(event, callback);
    }

    parseExchange(exchange: string, queueName: string): IEvent {
        return new EventDTO(queueName, exchange);
    }
}

export default RabbitMQServiceImpl;
