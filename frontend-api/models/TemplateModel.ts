import { Schema, model } from 'mongoose';

const TemplateSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    product_id: { type: Number, required: true },
    image_per_sku: { type: Number, required: true },
}, {
    collection: 'templates'
});

export type TemplateDocument = Document & {
    id: number,
    name: string,
    product_id: number,
    image_per_sku: number
}


export const Template = model<TemplateDocument>('Template', TemplateSchema);
