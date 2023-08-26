import { ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error";
import { useHttpGet, useHttpGetPostponedExecution } from "../../common/hook/http-get";
import { IConfig, IProduct } from "../../model/config";
import { ActionTypes } from "../../store/constant/action";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { cartInitial } from "../../store/initial/cart";
import { configInitial } from "../../store/initial/config";
import { selectDoMock } from "../../store/selector/config";
import { store } from "../../store/store";
import Navbar from "../navbar/Navbar";

const Header = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const doMock_rdx = useSelector(selectDoMock);

    const { response: config, error: configError, loading: loadingConfig } = useHttpGet<IConfig>('/config.json');
    const { response: productsFromServer, error: productsError, loading: loadingProducts, fetchData: fetchProducts } = useHttpGetPostponedExecution<IProduct[]>('/api/products');

    const [conf, setConf] = useState<IConfig>(configInitial);
    const [products, setProducts] = useState<IProduct[]>([]);


    const initConfig = (): void => { config && dispatch({ type: ActionTypes.CONFIG_INITIALIZE, payload: config, }); }
    const loadConfig = (): void => { config && setConf(config) }
    const loadProducts = (): void => {
        if (conf) {
            if (doMock_rdx) {
                setProducts(conf.mocks.products);
            } else {
                fetchProducts();
                (!loadingProducts && productsFromServer) && setProducts(productsFromServer);
                (!loadingProducts && productsError) && handleHttpError<IProduct[]>(productsError!, navigate)
            };
        }
    }
    const initCart = (): void => { conf && dispatch({ type: ActionTypes.CART_INITIALIZE, payload: cartInitial, }); }
    const initProduct = (): void => { products && dispatch({ type: ActionTypes.PRODUCTS_INITIALIZE, payload: products, }); }

    useEffect((): void => initConfig(), [config]);
    useEffect((): void => loadConfig(), [config]);
    useEffect((): void => loadProducts(), [conf]);
    useEffect((): void => initCart(), [conf]);
    useEffect((): void => initProduct(), [products]);

    (!loadingConfig && configError) && handleHttpError<IConfig>(configError)

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={conf}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider >
    )
}

export default Header;
