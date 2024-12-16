import { IEvent } from '~/interfaces/IEvent';

class EventDTO implements IEvent {
    queueName: string;
    routingKey: string;
    exchangeType: string;
    data: any;

    constructor(queueName: string, routingKey: string, exchangeType: string) {
        this.queueName = queueName;
        this.routingKey = routingKey;
        this.exchangeType = exchangeType;
    }

    getQueueName(): string {
        return this.queueName;
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
