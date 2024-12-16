import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: false },
    image_url: { type: String},
});

const CategorySchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
});

const ProductSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    high_price: { type: Number, required: false },
    image_url: { type: String, required: true },
    product_id: { type: Number, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    category_id: { type: Number, required: false },
    user: UserSchema,
    categories: [CategorySchema],
});

export type ProductDocument = Document & {
    name: string,
    slug: string,
    email: string,
    price: number,
    high_price: number,
    image_url: string,
    product_id: number,
    description: string,
    status: string,
    category_id: string,
    user: UserDocument,
    categories: [CategoryDocument],
}

export type UserDocument = Document & {
    id: number,
    name: string,
    slug: string,
    image_url: string,
}

export type CategoryDocument = Document & {
    id: number,
    name: string,
    slug: string,
    description: string,
    image_url: string,
}

export const Product = model<ProductDocument>('Product', ProductSchema);
