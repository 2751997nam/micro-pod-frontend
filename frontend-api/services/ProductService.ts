import { IProductSaveData } from '~/dto/IProductSaveData';
import { ProductDocument } from '~/models/ProductModel';

export interface ProductService {
    save(input: IProductSaveData): Promise<ProductDocument>;
}
