import { ReactElement, useEffect, useState } from "react";
import { handleHttpError } from "../../common/error";
import { useHttpGetPostponedExecution } from "../../common/hook/http-get";
import { IProduct } from "../../model/config";
import { selectConfig } from "../../store/selector/selector";
import { store } from "../../store/store";
import './Products.scss';
import Tile from "./tile/Tile";

const Products = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { response: productsFromServer, error, loading, fetchData } = useHttpGetPostponedExecution<IProduct[]>('/products');

    useEffect((): void => {
        const doMockFromRedux = selectConfig(store.getState()).doMock;
        if (doMockFromRedux) {
            const productsFromRedux = selectConfig(store.getState()).mocks.products;
            setProducts(productsFromRedux);
        } else {
            fetchData();
            if (!loading && productsFromServer) { setProducts(productsFromServer) }
            else if (!loading && error) { handleHttpError<IProduct[]>(error!) };
        }
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
