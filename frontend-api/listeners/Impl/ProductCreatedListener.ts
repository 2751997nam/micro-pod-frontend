import { container, injectable, singleton } from 'tsyringe';
import { Channel, ConsumeMessage } from 'amqplib';
import { IListener } from '~/interfaces/IListener';
import { ProductService } from '~/services/ProductService';
import { IProduct } from '~/interfaces/IProduct';
import { ICategory } from '~/interfaces/ICategory';
import { IUser } from '~/interfaces/IUser';
import LogService from '~/services/LogService';

@singleton()
class ProductCreatedListener implements IListener {
    private productService: ProductService;
    private logService: LogService;
    constructor() {
        this.productService = container.resolve("ProductService");
        this.logService = container.resolve("LogService");
    }
    handle = async (channel: Channel, message: ConsumeMessage | null): Promise<void> => {
        console.log('ProductCreatedListener has message')
        if (!message) {
            return;
        }
        const parseMessage = message.content.toString();
        try {
            console.log('ProductCreatedListener', JSON.parse(parseMessage));
            const data = JSON.parse(parseMessage);
            const product = data.data as IProduct;
            if (data.data.categories) {
                product.categories = data.data.categories as ICategory[];
            }
    
            if (data.user) {
                product.user = data.user as IUser;
            }
    
            await this.productService.save(product);
            channel.ack(message);
        } catch (error: any) {
            this.logService.error('ProductCreatedListener ERROR', [error.message, parseMessage]);
        }
    };

    getQueue(): string {
        return `micro_pod_product_api_product`;
    }
    getExchange(): string {
        return 'product.changed.fanout';
    }

    listen(): void {
        console.log('ProductCreatedListener');
    }
}

export default ProductCreatedListener;
