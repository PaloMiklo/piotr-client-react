import { ReactElement } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "../about/About";
import Cart from "../cart/Cart";
import Home from "../home/Home";
import Products from "../products/Products";

const Navbar = (): ReactElement<Element, string> => {
    return (
        <BrowserRouter>
            <div className="navigation-wrapper">
                <nav>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </nav>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Navbar;