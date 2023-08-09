import { ReactElement, useEffect, useState } from "react";
import { Provider } from "react-redux";
import ConfigContext from "../../store/context/config-ctx";
import { useAppDispatch } from "../../store/hook/hook";
import { IConfig } from "../../model/config";
import { handleHttpError } from "../../common/error";
import { store } from "../../store/store";
import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";
import { ActionTypes } from "../../store/constant/action";
import { useHttpGet } from "../../common/hook/http-get";
import { configInitial } from "../../store/initial/config";

const Header = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { response: data, error, loading } = useHttpGet<IConfig>('/config.json');
    const [configFromRedux, setConfigFromRedux] = useState<IConfig>(configInitial);

    useEffect(() => {
        const { value: config } = store.getState().config;
        setConfigFromRedux(config)
    })

    useEffect(() => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    });

    if (loading) {
        return <Loading />
    }

    if (!loading && error) {
        handleHttpError<IConfig>(error)
    }

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <Navbar />
            </ConfigContext.Provider>
        </Provider>
    )
};

export default Header;
