import { Channel, Message } from 'amqplib';

export interface IListener {
    getExchange(): string;
    getQueue(): string;
    listen(): void;
    handle(channel: Channel, message: Message): void;
}
