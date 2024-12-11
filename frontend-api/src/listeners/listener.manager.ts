import { IListener } from '@interfaces/IListener';
import RabbitMQService from '@services/rabbitmq/rabbitmq.service';
import ProductCreatedListener from '@listeners/impl/ProductCreatedListener';
import { Injectable } from '@nestjs/common';
@Injectable()
class ListenerManager {
    private listeners: Map<string, IListener>;

    constructor(
        private rabbitMQService: RabbitMQService,
        private productCreatedListener: ProductCreatedListener
    ) {
        this.loadListeners();
    }

    private async loadListeners(): Promise<void> {
        this.listeners = new Map();

        this.listeners.set('ProductCreatedListener', this.productCreatedListener);
    }

    public listens(): void {
        for (const listener of this.listeners.values()) {
            this.rabbitMQService.consumeExchange(listener.getExchange(), listener.handle);
        }
    }
}

export default ListenerManager;
