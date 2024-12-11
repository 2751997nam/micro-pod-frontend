import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import RabbitMQService from '@services/rabbitmq/rabbitmq.service';
import ListenerManager from '@listeners/listener.manager';
const PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // register all plugins and extension
    app.enableCors({ origin: '*' });
    app.useGlobalPipes(new ValidationPipe({}));
    app.enableVersioning({ type: VersioningType.URI });
    app.use(helmet());
    app.use(compression());

    await app.listen(PORT, async () => {
        while (true) {
            try {
                const rabbitMQService = app.get(RabbitMQService);
                await rabbitMQService.connect();
                break;
            } catch {
                console.log('Connect to RabbitMQ Server failed');
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
        const listenerManager = app.get(ListenerManager);
        listenerManager.listens();
        console.log('🚀 Frontend API running');
    });
}

bootstrap();
