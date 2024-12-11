/* eslint-disable indent */
import { ICategory } from '@interfaces/ICategory';
import { IUser } from '@interfaces/IUser';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', timestamps: true })
export class Product {
    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    price: number;

    @Prop()
    high_price: number;

    @Prop()
    image_url: string;

    @Prop()
    product_id: number;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop()
    category_id: number;

    @Prop({ type: Object, ref: 'IUser' })
    user: IUser;

    @Prop({ type: Object, ref: 'ICategory' })
    categories: ICategory[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
