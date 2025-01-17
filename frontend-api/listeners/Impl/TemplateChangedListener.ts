import { container, injectable, singleton } from 'tsyringe';
import { Channel, ConsumeMessage } from 'amqplib';
import { IListener } from '~/interfaces/IListener';
import { ProductService } from '~/services/ProductService';
import { IProduct } from '~/interfaces/IProduct';
import { ICategory } from '~/interfaces/ICategory';
import { IUser } from '~/interfaces/IUser';
import LogService from '~/services/LogService';
import { IProductSaveData } from '~/dto/IProductSaveData';
import { ITemplateSaveData } from '~/dto/ITemplateSaveData';
import { TemplateService } from '~/services/TemplateService';

@singleton()
class TemplateChangedListener implements IListener {
    private templateService: TemplateService;
    private logService: LogService;
    constructor() {
        this.templateService = container.resolve("TemplateService");
        this.logService = container.resolve("LogService");
    }
    handle = async (channel: Channel, message: ConsumeMessage | null): Promise<void> => {
        this.logService.info('TemplateChangedListener has message')
        if (!message) {
            return;
        }
        const parseMessage = message.content.toString();
        try {
            this.logService.info(parseMessage);
            const data = JSON.parse(parseMessage);
            const product = data.data as ITemplateSaveData;
    
            await this.templateService.save(product);
            channel.ack(message);
        } catch (error: any) {
            channel.ack(message);
            this.logService.error('TemplateChangedListener ERROR', [error.message, parseMessage]);
        }
    };

    getQueue(): string {
        return `micro_pod_main_queue`;
    }
    
    getExchange(): string {
        return 'federate_template.changed.fanout';
    }

    listen(): void {
        console.log('TemplateChangedListener');
    }
}

export default TemplateChangedListener;
