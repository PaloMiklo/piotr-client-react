import { createContext, useContext } from 'react';
import { configInitial } from '../initial/config';
import { IConfig } from '../../model/config';

const ConfigContext = createContext<IConfig>(configInitial);

export const useConfig = (): IConfig => {
    return useContext(ConfigContext);
};

export default ConfigContext;
