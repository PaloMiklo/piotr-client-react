import { Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import Cart from "./components/cart/Cart";
import Contact from "./components/contact/Contact";
import Product from "./components/product/Product";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
    </Routes>
)

export default AppRoutes;