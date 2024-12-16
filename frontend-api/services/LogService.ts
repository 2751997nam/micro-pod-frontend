import { ILog } from '~/interfaces/ILog';

interface LogService {
    info(message: string, context?: any[]): Promise<void>;

    error(message: string, context?: any[]): Promise<void>;

    log(logData: ILog): Promise<void>;
}

export default LogService;
