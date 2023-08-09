import { ReactElement, useState, useEffect } from "react";
import { IProduct } from "../../model/config";
import { selectConfig } from "../../store/selector/selector";
import { store } from "../../store/store";
import Tile from "./tile/Tile";
import './Products.scss';

const Products = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const productsFromRedux = selectConfig(store.getState());
        setProducts(productsFromRedux.mocks.products);
    }, []);

    return (
        <ul>
            <li>
                <div className="products">
                    {products.map((product: IProduct) => (
                        <Tile key={product.id} product={product} />
                    ))}
                </div>
            </li>
        </ul>
    );
};

export default Products;
