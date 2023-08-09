import { useEffect } from 'react';
import { useHttpGet } from '../../hook/useHttpGet';
import { IConfig } from '../../model/config';
import { ReactElement } from 'react';
import { ActionTypes } from '../../core/action';
import { useAppDispatch } from '../../hook/app';
import Main from '../main/main';
import { Provider } from 'react-redux';
import ConfigContext from '../../context/config-ctx';
import { store } from '../../store/store';
import { handleError } from '../../service/error';

const MainWrapper = (): ReactElement<Element, string> => {
    const dispatch = useAppDispatch();
    const { response: data, error, loading } = useHttpGet<IConfig>('/config.json');
    const configFromRedux = store.getState().config.value;

    useEffect(() => {
        if (data) {
            dispatch({
                type: ActionTypes.CONFIG_INITIALIZE,
                payload: data,
            });
        }
    });

    if (loading) {
        return <p>Loading...</p>
    }

    if (!loading && error) {
        handleError<IConfig>(error)
    }

    return (
        <Provider store={store}>
            <ConfigContext.Provider value={configFromRedux}>
                <Main></Main>
            </ConfigContext.Provider>
        </Provider>
    )
};

export default MainWrapper;
