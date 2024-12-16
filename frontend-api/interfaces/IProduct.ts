import { ICategory } from './ICategory';
import { IUser } from './IUser';

export interface IProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    high_price: number;
    image_url: string;
    status: string;
    categories?: ICategory[];
    user?: IUser;
}
