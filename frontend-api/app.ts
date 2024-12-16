import 'reflect-metadata';
import express, { Express, Request } from 'express';
import compression from 'compression';
import cors from 'cors';
import { injectable, container } from 'tsyringe';
global.__dir = __dirname;
import bodyParser from 'body-parser';
import routes from '~/routes';
// import EnvironmentMiddleware from './app/middlewares/EnvironmentMiddleware';
import dotenv from 'dotenv';
// dotenv.config();
import ApplicationProvider from '~/providers/ApplicationProvider';
ApplicationProvider.registerModules();
import ListenerManager from '~/listeners/ListenerManager';
import RabbitMQService from '~/services/RabbitMQService';
import * as mongoose from 'mongoose';
import { connectToDB } from '~/database/DB';
@injectable()
class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.setup();
    }

    private setup(): void {
        // this.app.use(EnvironmentMiddleware);
        this.app.use(cors<Request>());
        this.app.use(express.static(`${__dirname}/public`));
        this.app.use(bodyParser.json());
        this.app.use(
            compression({
                filter: (req, res) => {
                    if (req.headers['x-no-compression']) {
                        // don't compress responses with this request header
                        return false;
                    }

                    // fallback to standard filter function
                    return compression.filter(req, res);
                }
            })
        );

        this.app.use(routes);
        this.app.use(express.json());
    }

    public async start(port: number): Promise<void> {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        await connectToDB();

        const rabbitMQService: RabbitMQService = container.resolve("RabbitMQService");
        const check = setInterval(() => {
            if (rabbitMQService.wasConnected()) {
                const listener: ListenerManager = container.resolve(ListenerManager);
                listener.listens();
                clearInterval(check);
            }
        }, 1000);
    }
}
const app = ApplicationProvider.getContainer().resolve(App);
const port = parseInt(process.env.APP_PORT!) || 3000;
app.start(port);
