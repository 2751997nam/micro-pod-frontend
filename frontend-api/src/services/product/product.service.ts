import { Model } from 'mongoose';
import { Product } from '@models/product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import LogService from '@services/log/log.service';
import { IProduct } from '@interfaces/IProduct';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        private readonly logService: LogService
    ) {}
    public async save(input: IProduct): Promise<Product> {
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
