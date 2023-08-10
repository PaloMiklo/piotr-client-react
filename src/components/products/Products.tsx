import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../model/config";
import { selectProducts } from "../../store/selector/products";
import Loading from "../loading/Loading";
import './Products.scss';
import Tile from "./tile/Tile";

const Products = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const productsFromRedux = useSelector(selectProducts);

    useEffect((): void => setProducts(productsFromRedux), [productsFromRedux]);

    return products.length ? (
        <ul>
            <li>
                <div className="products">
                    {products.map((product: IProduct) => (
                        <Tile key={product.id} product={product} />
                    ))}
                </div>
            </li>
        </ul>
    ) : <Loading />;
};

export default Products;
