import { useEffect } from 'react';
import { useData } from '../hook/useData';
import { connect } from 'react-redux';
import { IConfig } from '../model/config';
import { ReactElement } from 'react';
import { ActionTypes } from '../core/action';
import { useAppDispatch } from '../hook/app';
import { RootState, store } from '../store/store';
import { IMainProps } from './main.props';
import { selectConfig } from '../selector/selector';

const MainWrapper = (props: IMainProps): ReactElement<Element, string> => {
    const { config } = props;
    const dispatch = useAppDispatch();
    const { data } = useData<IConfig>('/config.json');

    useEffect(() => {
        dispatch({
            type: ActionTypes.CONFIG_INITIALIZE,
            payload: data,
        });
    }, [data]);

    console.log('props', config);
    console.log(selectConfig(store.getState()))

    return !data ? <p>Loading...</p> : <p>Loaded</p>
};

const mapStateToProps = (state: RootState): { config: IConfig; } => ({ config: state.config.value! });

export default connect(mapStateToProps)(MainWrapper);
