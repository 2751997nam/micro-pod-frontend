export interface ILog {
    message: string;
    context: any[];
    level: number;
    level_name: string;
    channel: string;
    datetime: string;
    extra: any[];
}
