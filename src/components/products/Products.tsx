import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error";
import { useHttpGetPostponedExecution } from "../../common/hook/http-get";
import { IProduct } from "../../model/config";
import { selectConfig } from "../../store/selector/selector";
import Loading from "../loading/Loading";
import './Products.scss';
import Tile from "./tile/Tile";

const Products = (): ReactElement => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<IProduct[]>([]);
    const { response: productsFromServer, error, loading, fetchData } = useHttpGetPostponedExecution<IProduct[]>('/api/products');
    const doMockFromRedux = useSelector(selectConfig).doMock;
    const productsFromRedux = useSelector(selectConfig).mocks.products;

    useEffect((): void => {
        if (doMockFromRedux) {
            setProducts(productsFromRedux);
        } else {
            fetchData();
            if (!loading && productsFromServer) { setProducts(productsFromServer) }
            else if (!loading && error) { handleHttpError<IProduct[]>(error!, navigate) };
        }
    }, [doMockFromRedux]);

    if (products.length) {
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
    }

    return <Loading />;
};

export default Products;
