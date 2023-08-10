import { ReactElement, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { handleHttpError } from "../../common/error";
import { useHttpGet } from "../../common/hook/http-get";
import { IConfig } from "../../model/config";
import { ActionTypes } from "../../store/constant/action";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { configInitial } from "../../store/initial/config";
import { store } from "../../store/store";
import Navbar from "../navbar/Navbar";

const Header = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { response: data, error, loading } = useHttpGet<IConfig>('/config.json');
    const [configFromRedux, setConfigFromRedux] = useState<IConfig>(configInitial);

    useEffect((): void => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    }, [data]);

    useEffect((): void => {
        const { value: config } = store.getState().config;
        setConfigFromRedux(config)
    }, [configFromRedux]);

    // if (loading) { return <Loading /> }

    (!loading && error) && handleHttpError<IConfig>(error)

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider>
    )
};

export default Header;
