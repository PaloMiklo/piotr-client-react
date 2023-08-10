import { ReactElement, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleHttpError } from "../../common/error";
import { useHttpGet, useHttpGetPostponedExecution } from "../../common/hook/http-get";
import { IConfig, IProduct } from "../../model/config";
import { ActionTypes } from "../../store/constant/action";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { configInitial } from "../../store/initial/config";
import { selectDoMock } from "../../store/selector/config";
import { store } from "../../store/store";
import Navbar from "../navbar/Navbar";

const Header = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { response: config, error: configError, loading: loadingConfig } = useHttpGet<IConfig>('/config.json');
    const { response: productsFromServer, error: productsError, loading: loadingProducts, fetchData: fetchProducts } = useHttpGetPostponedExecution<IProduct[]>('/api/products');
    const [configFromRedux, setConfigFromRedux] = useState<IConfig>(configInitial);
    const doMockFromRedux = useSelector(selectDoMock);
    const [products, setProducts] = useState<IProduct[]>([]);

    const initStore = (): void => { config && dispatch({ type: ActionTypes.CONFIG_INITIALIZE, payload: config, }); }

    const loadConfigFromStore = (): void => { config && setConfigFromRedux(config) }

    const loadProducts = (): void => {
        if (configFromRedux) {
            if (doMockFromRedux) {
                setProducts(configFromRedux.mocks.products);
            } else {
                fetchProducts();
                (!loadingProducts && productsFromServer) && setProducts(productsFromServer);
                (!loadingProducts && productsError) && handleHttpError<IProduct[]>(productsError!, navigate)
            };
        }
    }

    const initProductStore = (): void => { products && dispatch({ type: ActionTypes.PRODUCTS_INITIALIZE, payload: products, }); }

    useEffect((): void => initStore(), [config]);
    useEffect((): void => loadConfigFromStore(), [config]);
    useEffect((): void => loadProducts(), [configFromRedux]);
    useEffect((): void => initProductStore(), [products]);

    (!loadingConfig && configError) && handleHttpError<IConfig>(configError)

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <ConfigContext.Provider value={configFromRedux}>
                    <Navbar />
                </ConfigContext.Provider>
            </ConfigContext.Provider>
        </Provider>
    )
}

export default Header;
