export interface IEvent {
    getQueueName(): string;
    getExchange(): string;
    getRoutingKey(): string;
    getExchangeType(): string;
    getData(): any;
}
