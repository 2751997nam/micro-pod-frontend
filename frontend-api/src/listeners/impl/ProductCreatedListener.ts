import { Injectable } from '@nestjs/common';
import { Channel, Message } from 'amqplib';
import { IListener } from '@interfaces/IListener';
import { ProductService } from '@services/product/product.service';
import { IProduct } from '@interfaces/IProduct';
import { ICategory } from '@interfaces/ICategory';
import { IUser } from '@interfaces/IUser';

@Injectable()
class ProductCreatedListener implements IListener {
    constructor(private productService: ProductService) {}
    handle = async (channel: Channel, message: Message): Promise<void> => {
        const parseMessage = message.content.toString();
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
    };

    getQueue(): string {
        return process.env.APP_NAME.toLowerCase().replace(/_/g, '-');
    }
    getExchange(): string {
        return 'product.changed.fanout';
    }

    listen(): void {
        console.log('ProductCreatedListener');
    }
}

export default ProductCreatedListener;
