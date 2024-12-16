import express, { Request, Response, Router as ExpressRouter } from 'express';
import Utils from '~/helpers/Utils';
import { container } from 'tsyringe';

interface Handle {
    (req: Request, res: Response): void;
}

class Router {
    router: ExpressRouter;
    controllers: Map<string, any>;
    constructor() {
        this.router = express.Router();
        this.controllers = new Map<string, any>();
        this.initControllers();
    }

    getRouter() {
        return this.router;
    }

    get(path: string, handle: string | Handle) {
        if (handle instanceof Function) {
            this.router.get(path, handle);
            return;
        }
        const [controller, methodName] = this.getHandle(handle.toString());
        this.router.get(path, (req: Request, res: Response) => controller[methodName](req, res));
    }

    post(path: string, handle: string | Handle) {
        if (handle instanceof Function) {
            this.router.post(path, handle);
            return;
        }
        const [controller, methodName] = this.getHandle(handle.toString());
        this.router.post(path, (req: Request, res: Response) => controller[methodName](req, res));
    }

    put(path: string, handle: string | Handle) {
        if (handle instanceof Function) {
            this.router.put(path, handle);
            return;
        }
        const [controller, methodName] = this.getHandle(handle.toString());
        this.router.put(path, (req: Request, res: Response) => controller[methodName](req, res));
    }

    patch(path: string, handle: string | Handle) {
        if (handle instanceof Function) {
            this.router.patch(path, handle);
            return;
        }
        const [controller, methodName] = this.getHandle(handle.toString());
        this.router.patch(path, (req: Request, res: Response) => controller[methodName](req, res));
    }

    delete(path: string, handle: string | Handle) {
        if (handle instanceof Function) {
            this.router.delete(path, handle);
            return;
        }
        const [controller, methodName] = this.getHandle(handle.toString());
        this.router.delete(path, (req: Request, res: Response) => controller[methodName](req, res));
    }

    private initControllers() {
        this.controllers = new Map<string, any>();
        const controllerPath = '/app/controllers';
        const dir = global.__dir + controllerPath;
        const filePaths = Utils.browseFiles(dir);
        for (const filePath of filePaths) {
            const fileName = filePath.replace(dir, '').replace('.ts', '').replace('/', '');
            this.controllers.set(fileName, container.resolve(fileName));
        }
    }

    private getHandle(handleStr: string): any[] {
        const [controllerName, methodName] = handleStr.split('@');
        const retVal: any[] = [];
        retVal.push(this.controllers.get(controllerName));
        retVal.push(methodName);

        return retVal;
    }
}

export default new Router();
