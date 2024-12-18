import { IEvent } from '~/interfaces/IEvent';

class EventDTO implements IEvent {
    queueName: string;
    routingKey: string;
    exchangeType: string;
    exchange: string;
    data: any;

    constructor(queueName: string, exchange: string) {
        const [_, routingKey, exchangeType] = exchange.split('.');
        this.queueName = queueName;
        this.exchange = exchange;
        this.routingKey = routingKey;
        this.exchangeType = exchangeType;
    }

    getQueueName(): string {
        return this.queueName;
    }

    getExchange(): string {
        return this.exchange;
    }

    getRoutingKey(): string {
        return this.routingKey;
    }

    getExchangeType(): string {
        return this.exchangeType;
    }

    getData(): any {
        return this.data;
    }

    setQueueName(queueName: string): void {
        this.queueName = queueName;
    }

    setExchange(exchange: string): void {
        this.exchange = exchange;
    }

    setRoutingKey(routingKey: string): void {
        this.routingKey = routingKey;
    }

    setExchangeType(exchangeType: string): void {
        this.exchangeType = exchangeType;
    }

    setData(data: any): void {
        this.data = data;
    }
}

export default EventDTO;
