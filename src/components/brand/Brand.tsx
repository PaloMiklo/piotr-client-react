import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Brand = (): ReactElement => {
    return (
        <div className="container">
            <Link to="/">
                <img className="img-fluid" src="logo.png" />
            </Link>
        </div>
    )
}

export default Brand;