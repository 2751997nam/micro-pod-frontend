import { IListener } from '~/interfaces/IListener';
import RabbitMQService from '~/services/RabbitMQService';
import ProductCreatedListener from '~/listeners/Impl/ProductCreatedListener';
import { container, injectable, singleton } from 'tsyringe';
@singleton()
class ListenerManager {
    private listeners: Map<string, IListener>;
    private rabbitMQService: RabbitMQService;
    private productCreatedListener: ProductCreatedListener;
    constructor() {
        console.log('ListenerManager constructor');
        this.rabbitMQService = container.resolve("RabbitMQService");
        this.productCreatedListener = container.resolve("ProductCreatedListener");
        this.listeners = new Map();
        this.loadListeners();
    }
    
    private async loadListeners(): Promise<void> {
        this.listeners.set('ProductCreatedListener', this.productCreatedListener);
    }

    public listens(): void {
        for (const listener of this.listeners.values()) {
            this.rabbitMQService.consumeExchange(listener.getExchange(), listener.getQueue(), listener.handle);
        }
    }
}

export default ListenerManager;
