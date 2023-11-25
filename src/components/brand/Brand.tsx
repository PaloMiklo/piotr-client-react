import { ReactElement } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const Brand = (): ReactElement => {

    return (
        <div className="container">
            <Link to="/">
                <LazyLoad>
                    <img className="img-fluid" src="/images/logo.png" loading="lazy" />
                </LazyLoad>
            </Link>
        </div>
    )
}

export default Brand;