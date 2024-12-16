import { DependencyContainer, Lifecycle, container } from 'tsyringe';

import Utils from '~/helpers/Utils';

class ApplicationProvider {
    container: DependencyContainer;

    constructor() {
        this.container = container;
    }
    getContainer(): DependencyContainer {
        return this.container;
    }

    register(directory: string) {
        const dir = `${global.__dir}/${directory}`;
        const filePaths = Utils.browseFiles(dir);
        for (const filePath of filePaths) {
            const fileName = filePath.replace(dir, '').replace('.ts', '');
            const registerName = fileName.replace('Impl', '').replace('/', '');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            console.log(registerName, `~/${directory}${fileName}`);
            const instance = require(`~/${directory}${fileName}`).default;
            this.container.register(registerName, { useClass: instance }, {lifecycle: Lifecycle.Singleton });
        }
    }

    registerClass(directory: string) {
        const dir = `${global.__dir}/${directory}`;
        const fileName = `${directory.split('/').pop()}`.replace('.ts', '');
        const registerName = fileName.replace('Impl', '').replace('/', '');
        console.log(registerName, `~/${directory}`);
        const instance = require(`~/${directory}`).default;
        this.container.register(registerName, { useClass: instance }, {lifecycle: Lifecycle.Singleton });
    }

    registerModules() {
        this.register('services/Impl');
        this.register('listeners/Impl');
        this.registerClass('listeners/ListenerManager.ts');
    }
}

export default new ApplicationProvider();
