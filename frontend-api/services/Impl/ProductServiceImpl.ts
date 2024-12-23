import { Model } from 'mongoose';
import { Product, ProductDocument } from '~/models/ProductModel';
import { container, injectable, singleton } from 'tsyringe';
import LogService from '~/services/LogService';
import { IProduct } from '~/interfaces/IProduct';
import { ProductService } from '~/services/ProductService';
import { ProductSku, ProductSkuDocument } from '~/models/ProductSkuModel';
import { IProductSaveData } from '~/dto/IProductSaveData';
import { Variant, VariantDocument } from '~/models/VariantModel';
import { IVariant } from '~/interfaces/IVariant';
import { IOption } from '~/interfaces/IOption';

@singleton()
class ProductServiceImpl implements ProductService {
    private readonly productModel: Model<ProductDocument>;
    private readonly productSkuModel: Model<ProductSkuDocument>;
    private readonly variantModel: Model<VariantDocument>;
    private readonly logService: LogService;
    constructor() {
        this.productModel = Product;
        this.productSkuModel = ProductSku;
        this.variantModel = Variant;
        this.logService = container.resolve("LogService");
    }

    public async save(input: IProductSaveData): Promise<ProductDocument> {
        let product = await this.productModel.findOne({ product_id: input.id });
        if (product) {
            await this.productModel.updateOne({ id: product.id }, input);
        } else {
            const model = new this.productModel(input);
            product = await model.save();
        }
        await this.saveVariants(input.variants);
        await this.saveSkues(input);
        this.logService.info('saveProduct', [input]);

        return product;
    }

    public async saveVariants(variants: IVariant[]): Promise<void> {
        for (let variant of variants) {
            let existedVariant = await this.variantModel.findOne({ id: variant.id });
            if (existedVariant) {
                let newOptions = variant.options ? variant.options.reduce((acc, option) => {
                    acc[option.id] = option;
                    return acc;
                }, {} as { [key: number]: IOption }) : {};
                let existedOptions = existedVariant.options.reduce((acc, option) => {
                    acc[option.id] = option;
                    return acc;
                }, {} as { [key: number]: IOption });
                let mergeOptions = {
                    ...existedOptions,
                    ...newOptions
                };
                await this.variantModel.updateOne({ id: variant.id }, {
                    id: variant.id,
                    name: variant.name,
                    slug: variant.slug,
                    type: variant.type,
                    options: Object.values(mergeOptions)
                });
            } else {
                const model = new this.variantModel(variant);
                await model.save();
            }
        }
    }

    public async saveSkues(input: IProductSaveData): Promise<void> {
        await this.productSkuModel.deleteMany({ product_id: input.id });
        await this.productSkuModel.insertMany(input.productVariants);
    }
}

export default ProductServiceImpl;
