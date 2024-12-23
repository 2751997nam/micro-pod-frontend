import { IProduct } from "~/interfaces/IProduct";
import { IProductSku } from "~/interfaces/IProductSku";
import { IVariant } from "~/interfaces/IVariant";

export interface IProductSaveData extends IProduct {
    variants: IVariant[],
    productVariants: IProductSku[],
}