import { Document, Schema, model } from 'mongoose';

const OptionSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image_url: { type: String, required: false },
})

const VariantSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    options: [OptionSchema],
}, {
    collection: 'variants'
})

export type VariantDocument = Document & {
    id: number
    name: string
    slug: string
    type: string
    options: [OptionDocument]
}

export type OptionDocument = Document & {
    id: number
    name: string
    slug: string
    image_url?: string
}

export const Variant = model<VariantDocument>('Variant', VariantSchema);
