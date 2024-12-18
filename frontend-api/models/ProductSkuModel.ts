import { Document, Schema, model } from 'mongoose';

const ProductSkuSchema = new Schema({
    id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    sku: { type: String, required: true },
    image_url: { type: String, required: true },
    price: { type: Number, required: true },
    high_price: { type: Number, required: false },
    options: [Number]
})

export type ProductSkuDocument = Document & {
    id: number;
    product_id: number;
    sku: string;
    image_url: string;
    price: number;
    high_price: number;
    options: number[];
}

export const ProductSku = model<ProductSkuDocument>('ProductSku', ProductSkuSchema);
