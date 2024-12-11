import { ILog } from '@interfaces/ILog';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Time from '@utils/Time';

@Injectable()
class LogService {
    constructor(private readonly esService: ElasticsearchService) {}

    info(message: string, context?: any[]): void {
        this.log({
            message,
            context: context,
            level: 200,
            level_name: 'INFO',
            channel: 'local',
            extra: []
        } as ILog);
    }

    error(message: string, context?: any[]): void {
        this.log({
            message,
            context: context,
            level: 500,
            level_name: 'ERROR',
            channel: 'local',
            extra: []
        } as ILog);
    }

    private async log(logData: ILog): Promise<void> {
        console.log(process.env.ELASTIC_LOGS_INDEX, process.env.APP_NAME, logData.message, logData);

        // const response = await this.esService.index({
        //     index: process.env.ELASTIC_LOGS_INDEX,
        //     body: {
        //         level: 200,
        //         level_name: 'INFO',
        //         channel: 'local',
        //         ...logData,
        //         message: `${process.env.APP_NAME} | ${logData.message}`,
        //         datetime: Time.formatDateToISO(new Date())
        //     }
        // });

        // console.log('response', response);
    }
}

export default LogService;
