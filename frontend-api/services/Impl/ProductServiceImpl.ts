import { Model } from 'mongoose';
import { Product, ProductDocument } from '~/models/ProductModel';
import { container, injectable, singleton } from 'tsyringe';
import LogService from '~/services/LogService';
import { IProduct } from '~/interfaces/IProduct';
import { ProductService } from '~/services/ProductService';

@singleton()
class ProductServiceImpl implements ProductService {
    private readonly productModel: Model<ProductDocument>;
    private readonly logService: LogService;
    constructor() {
        this.productModel = Product;
        this.logService = container.resolve("LogService");
    }
    public async save(input: IProduct): Promise<ProductDocument> {
        let product = await this.productModel.findOne({ product_id: input.id });
        if (product) {
            await this.productModel.updateOne({ _id: product.id }, input);
        } else {
            const model = new this.productModel(input);
            model.product_id = input.id;
            product = await model.save();
        }
        this.logService.info('saveProduct', [input]);

        return product;
    }
}

export default ProductServiceImpl;
