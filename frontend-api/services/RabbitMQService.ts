import { Channel, ConsumeMessage } from 'amqplib';
import { IEvent } from '~/interfaces/IEvent';

interface RabbitMQService {
    connect(): void;
    
    wasConnected(): boolean;

    getPublishChannel(event: IEvent): Promise<Channel>;

    getConsumeChannel(event: IEvent): Promise<Channel>;

    publishEvent(event: IEvent): void;

    consumeEvent(event: IEvent, callback: (channel: Channel, message: ConsumeMessage | null) => void): void;

    consumeExchange(exchange: string, callback: (channel: Channel, message: ConsumeMessage | null) => void): void;

    parseExchange(exchange: string): IEvent;

    getExchange(event: IEvent): string;

    getConsumerQueue(event: IEvent): string;
}

export default RabbitMQService;
