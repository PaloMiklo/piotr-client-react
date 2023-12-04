import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

const Navbar: FC = (): ReactElement => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggler"
                aria-controls="navbarToggler"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item" data-testid="products"><Link to="/">Products</Link></li>
                    <li className="nav-item" data-testid="about"><Link to="/about">About</Link></li>
                    <li className="nav-item" data-testid="contact"><Link to="/contact">Contact</Link></li>
                    <li className="nav-item" data-testid="cart"><Link to="/cart">Cart</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;