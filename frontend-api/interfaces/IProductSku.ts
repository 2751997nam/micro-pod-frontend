export interface IProductSku {
    id: number;
    product_id: number;
    sku: string;
    image_url: string;
    price: number;
    high_price: number;
    options: number[];
}
