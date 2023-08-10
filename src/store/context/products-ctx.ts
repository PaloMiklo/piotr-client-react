import { createContext, useContext } from 'react';
import { IProduct } from '../../model/config';
import { productsInitial } from '../initial/products';

const ProductsContext = createContext<IProduct[]>(productsInitial);

export const useConfig = (): IProduct[] => useContext(ProductsContext);

export default ProductsContext;
