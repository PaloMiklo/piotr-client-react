import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Brand = (): ReactElement => {

    return (
        <div className="container">
            <Link to="/">
                <img className="img-fluid" src="/images/logo.png" loading="lazy" />
            </Link>
        </div>
    )
}

export default Brand;