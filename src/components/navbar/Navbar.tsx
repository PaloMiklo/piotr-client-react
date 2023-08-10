import { ReactElement } from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

const Navbar = (): ReactElement => {
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
                    <li className="nav-item"><Link to="/">Products</Link></li>
                    <li className="nav-item"><Link to="/about">About</Link></li>
                    <li className="nav-item"><Link to="/contact">Contact</Link></li>
                    <li className="nav-item"><Link to="/cart">Cart</Link></li>
                    <li className="nav-item"><Link to="/not-found">Not found</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;