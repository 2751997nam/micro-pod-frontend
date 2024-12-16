import { Channel, ConsumeMessage } from 'amqplib';

export interface IListener {
    getExchange(): string;
    getQueue(): string;
    listen(): void;
    handle(channel: Channel, message: ConsumeMessage | null): void;
}
