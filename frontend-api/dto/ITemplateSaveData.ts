import { IProductSku } from "~/interfaces/IProductSku";
import { ITemplateSku } from "~/interfaces/ITemplateSku";
import { IVariant } from "~/interfaces/IVariant";

export interface ITemplateSaveData {
    id: number,
    skues: ITemplateSku[],
}