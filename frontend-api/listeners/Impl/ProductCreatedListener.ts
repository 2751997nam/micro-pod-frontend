import { container, injectable, singleton } from 'tsyringe';
import { Channel, ConsumeMessage } from 'amqplib';
import { IListener } from '~/interfaces/IListener';
import { ProductService } from '~/services/ProductService';
import { IProduct } from '~/interfaces/IProduct';
import { ICategory } from '~/interfaces/ICategory';
import { IUser } from '~/interfaces/IUser';
import LogService from '~/services/LogService';
import { IProductSaveData } from '~/dto/IProductSaveData';

@singleton()
class ProductCreatedListener implements IListener {
    private productService: ProductService;
    private logService: LogService;
    constructor() {
        this.productService = container.resolve("ProductService");
        this.logService = container.resolve("LogService");
    }
    handle = async (channel: Channel, message: ConsumeMessage | null): Promise<void> => {
        this.logService.info('ProductCreatedListener has message')
        if (!message) {
            return;
        }
        const parseMessage = message.content.toString();
        try {
            this.logService.info(parseMessage);
            const data = JSON.parse(parseMessage);
            const product = data.data as IProductSaveData;
            if (data.data.categories) {
                product.categories = data.data.categories as ICategory[];
            }
    
            if (data.user) {
                product.user = data.user as IUser;
            }
    
            await this.productService.save(product);
            channel.ack(message);
        } catch (error: any) {
            channel.ack(message);
            this.logService.error('ProductCreatedListener ERROR', [error.message, parseMessage]);
        }
    };

    getQueue(): string {
        return `micro_pod_product_api_product`;
    }
    
    getExchange(): string {
        return 'federate_product.changed.fanout';
    }

    listen(): void {
        console.log('ProductCreatedListener');
    }
}

export default ProductCreatedListener;
