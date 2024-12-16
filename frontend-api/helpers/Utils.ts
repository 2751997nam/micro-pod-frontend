import fs from 'fs';
import DefaultConfig from '~/config/default';
class Utils {
    public static browseFiles(directory: string): string[] {
        let retval: string[] = [];
        if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach(function (item) {
                const subPath = `${directory}/${item}`;
                if (fs.lstatSync(subPath).isDirectory()) {
                    const files = Utils.browseFiles(subPath);
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

    public static getLocale() {
        return process.env.APP_LOCALE || 'us';
    }

    public static serialize(value: any): any {
        const retVal: { [key: string]: any } = {};
        for (const prop of Object.keys(value)) {
            if (value[prop] instanceof Function) {
                continue;
            }
            if (value[prop] instanceof Array) {
                retVal[Utils.camelToSnake(prop)] = [];
                for (const item of value[prop]) {
                    if (item instanceof Array || item instanceof Object) {
                        const tmp = Utils.serialize(item);
                        retVal[Utils.camelToSnake(prop)].push(tmp);
                    } else {
                        retVal[Utils.camelToSnake(prop)].push(item);
                    }
                }
            } else if (value[prop] instanceof Object) {
                retVal[Utils.camelToSnake(prop)] = Utils.serialize(value[prop]);
            } else {
                retVal[Utils.camelToSnake(prop)] = value[prop];
            }
        }

        return retVal;
    }

    public static camelToSnake(camelCaseString: string): string {
        return camelCaseString.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    }

    public static serializeList(values: any[]): any[] {
        const retVal: { [key: string]: any }[] = [];
        for (const value of values) {
            retVal.push(Utils.serialize(value));
        }

        return retVal;
    }

    public static padZero(num: number): string {
        return num > 9 ? `${num}` : `0${num}`;
    }

    public static dateToSqlTime(date: Date): string {
        return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${date.getHours()}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    }

    public static ceilPrice(price: number): number | string {
        let retVal = price.toFixed(5) as number | string;
        retVal = Math.round((parseFloat(retVal as string) + Number.EPSILON) * 100) / 100;
        retVal = Utils.ceilDecimal(retVal);

        return retVal;
    }

    public static ceilDecimal(value: number | string): number | string {
        const priceTempate = DefaultConfig.currency_template[DefaultConfig.currency_unit];
        const matches = priceTempate.match(/{money}{([^a-zA-z0-9]+)}{([0-9]+)}/);
        let exp = -2;
        if (matches.length === 3) {
            const tmp = parseInt(matches[2]);
            exp = tmp * (tmp ? -1 : 1);
        }
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math.ceil(value as number);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        let arrValues = value.toString().split('e');
        value = Math.ceil(+`${arrValues[0]}e${arrValues[1] ? +arrValues[1] - exp : -exp}`);
        // Shift back
        arrValues = value.toString().split('e');

        return +`${arrValues[0]}e${arrValues[1] ? +arrValues[1] + exp : exp}`;
    }

    public static arrayUnique(array: number[]): number[] {
        return Object.keys(
            array.reduce(
                (acc, item) => {
                    acc[item] = true; // Converting 'T' to 'string'
                    return acc;
                },
                {} as { [key: number]: boolean }
            )
        ).map((key) => parseInt(key)); // Converting 'string' to 'T'
    }

    public static decorCacheKey(key: string): string {
        return `${Utils.getLocale()}-${key}`;
    }
}

export default Utils;
