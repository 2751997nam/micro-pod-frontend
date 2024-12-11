import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import RabbitMQService from './services/rabbitmq/rabbitmq.service';
import { ProductService } from './services/product/product.service';
import ListenerManager from '@listeners/listener.manager';
import { Product, ProductSchema } from '@models/product.model';
import ProductCreatedListener from '@listeners/impl/ProductCreatedListener';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';
import LogService from '@services/log/log.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`, {
            dbName: process.env.DATABASE_NAME,
            auth: {
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD
            }
        }),
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            }
        ]),
        // ElasticsearchModule.register({
        //     node: process.env.ELASTIC_HOST
        // })
    ],
    controllers: [AppController],
    providers: [AppService, RabbitMQService, ProductService, ListenerManager, ProductCreatedListener, LogService]
})
export class AppModule {}
