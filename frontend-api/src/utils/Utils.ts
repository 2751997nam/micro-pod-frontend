import * as fs from 'fs';

class Utils {
    static buildPath(path: string): string {
        return `${global.__dir}/public/${path}`;
    }

    static browseFiles(directory: string): string[] {
        let retval: string[] = [];
        if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach((item) => {
                const subPath = `${directory}/${item}`;
                if (fs.lstatSync(subPath).isDirectory()) {
                    const files = this.browseFiles(subPath);
                    if (files.length > 0) {
                        retval = retval.concat(files);
                    }
                } else {
                    retval.push(subPath);
                }
            });
        }

        return retval;
    }

    static pathToName(path: string): string {
        const name = path.split('/').pop();

        return name.split('.').shift();
    }

    static toSnakeCase(name: string): string {
        return name
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_')
            .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert an underscore between lowercase and uppercase letters
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .toLowerCase();
    }
}

export default Utils;
