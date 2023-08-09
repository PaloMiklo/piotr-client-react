import { ReactElement } from 'react';
import { useConfig } from '../../context/config-ctx';
import Navbar from '../navbar/Navbar';

const Main = (): ReactElement<Element, string> => {
    const config = useConfig();
    console.log('Main.config -> ', config)

    return (
        <div className='navbar-wrapper'>
            <Navbar></Navbar>
        </div>)
};

export default Main;
