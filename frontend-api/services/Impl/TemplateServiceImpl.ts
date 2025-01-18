import { Model } from 'mongoose';
import { container, singleton } from 'tsyringe';
import LogService from '~/services/LogService';
import { TemplateService } from '../TemplateService';
import { ITemplateSaveData } from '~/dto/ITemplateSaveData';
import { TemplateSku, TemplateSkuDocument } from '~/models/TemplateSkuModel';

@singleton()
class TemplateServiceImpl implements TemplateService {
    private readonly templateSkuModel: Model<TemplateSkuDocument>;
    private readonly logService: LogService;
    constructor() {
        this.templateSkuModel = TemplateSku;
        this.logService = container.resolve("LogService");
    }

    public async save(input: ITemplateSaveData): Promise<void> {
        await this.saveSkues(input);
        this.logService.info('saveTemplate', [input]);
    }

    public async saveSkues(input: ITemplateSaveData): Promise<void> {
        await this.templateSkuModel.deleteMany({ template_id: input.id });
        await this.templateSkuModel.insertMany(input.skues);
    }
}

export default TemplateServiceImpl;
