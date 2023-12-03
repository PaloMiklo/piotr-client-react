import { FC, ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const Brand: FC = (): ReactElement => {

    return (
        <div className="container">
            <Link to="/">
                <LazyLoad once>
                    <img className="img-fluid" src="/images/logo.png" loading="lazy" />
                </LazyLoad>
            </Link>
        </div>
    )
}

export default Brand;