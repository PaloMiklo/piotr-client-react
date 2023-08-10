import { createContext, useContext } from 'react';
import { IConfig } from '../../model/config';
import { configInitial } from '../initial/config';

const ConfigContext = createContext<IConfig>(configInitial);

export const useConfig = (): IConfig => useContext(ConfigContext);

export default ConfigContext;
