import { Product } from "./Product.interface";

export interface Category {
    id: number;
    title: string;
    image: string;
    items: Product[]
}