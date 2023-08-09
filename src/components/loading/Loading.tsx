import { ReactElement } from 'react';
import { CircleLoader } from 'react-spinners';
import './Loading.scss';

const Loading = (): ReactElement<Element, string> => {

    return (
        <div className="loading-container">
            <CircleLoader color={'#36D7B7'} size={100} />
        </div>
    )

}

export default Loading;