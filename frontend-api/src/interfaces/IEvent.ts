export interface IEvent {
    getQueueName(): string;
    getRoutingKey(): string;
    getExchangeType(): string;
    getData(): any;
}
