import { ReactElement } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "../about/About";
import Cart from "../cart/Cart";
import Home from "../home/Home";
import Products from "../products/Products";
import './Navbar.scss';

const Navbar = (): ReactElement<Element, string> => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggler"
                aria-controls="navbarToggler"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler"></div>
            <BrowserRouter>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item"><Link to="/about">About</Link></li>
                        <li className="nav-item"><Link to="/products">Products</Link></li>
                        <li className="nav-item"><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </nav>
    );
}

export default Navbar;