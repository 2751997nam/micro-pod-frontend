import { ILog } from '~/interfaces/ILog';
import { injectable, singleton } from 'tsyringe';
import LogService from '~/services/LogService';
import Time from '~/utils/Time';
import fs from 'fs';

@singleton()
class LogServiceImpl implements LogService {
    info(message: string, context?: any[]): Promise<void> {
        return this.log({
            message,
            context: context,
            level: 200,
            level_name: 'INFO',
            channel: 'local',
            extra: [],
            datetime: (new Date()).toISOString()
        } as ILog);
    }

    error(message: string, context?: any[]): Promise<void> {
        return this.log({
            message,
            context: context,
            level: 500,
            level_name: 'ERROR',
            channel: 'local',
            extra: [],
            datetime: (new Date()).toISOString()
        } as ILog);
    }

    async log(logData: ILog): Promise<void> {
        console.log(Time.formatDateToISO(new Date()), logData.message, logData.context);
        const logPath = `${global.__dir}/logs/log-${Time.formatDate(new Date())}.log`;
        if (!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, '');
        }
        fs.appendFileSync(logPath, `${Time.formatDateToISO(new Date())} | ${logData.message} | ${JSON.stringify(logData.context)} \n`);

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

export default LogServiceImpl;
