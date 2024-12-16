import { ProductDocument } from '~/models/ProductModel';
import { IProduct } from '~/interfaces/IProduct';

export interface ProductService {
    save(input: IProduct): Promise<ProductDocument>;
}
