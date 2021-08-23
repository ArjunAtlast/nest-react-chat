import { Product } from '@wkart/interfaces';

export const products: Product[] = Array.from({ length: 5 }, (_, i) => ({
  id: `PRODUCT_${i}`,
  title: `Product ${i}`
}));

Object.freeze(products);