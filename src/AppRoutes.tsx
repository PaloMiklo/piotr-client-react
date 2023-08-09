import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";
import Products from "./components/products/Products";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>
)

export default AppRoutes;