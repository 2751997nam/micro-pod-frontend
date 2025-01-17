import { ITemplateSaveData } from '~/dto/ITemplateSaveData';

export interface TemplateService {
    save(input: ITemplateSaveData): Promise<void>;
}
