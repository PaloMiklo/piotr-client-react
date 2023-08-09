import { ReactElement } from 'react';
import { useConfig } from '../../context/config-ctx';

const Main = (): ReactElement<Element, string> => {
    const config = useConfig();
    console.log('Main.config -> ', config)

    return <p>Main</p>
};

export default Main;
