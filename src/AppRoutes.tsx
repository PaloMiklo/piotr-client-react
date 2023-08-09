import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./components/products/product/Product";

const Loading = lazy(() => import('./components/loading/Loading'));
const Products = lazy(() => import('./components/products/Products'));
const About = lazy(() => import('./components/about/About'));
const Contact = lazy(() => import('./components/contact/Contact'));
const Cart = lazy(() => import('./components/cart/Cart'));

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={
            <Suspense fallback={<Loading />}>
                <Products />
            </Suspense>
        } />

        <Route path="/products/:id" element={
            <Suspense fallback={<Loading />}>
                <Product />
            </Suspense>
        } />

        <Route path="/about" element={
            <Suspense fallback={<Loading />}>
                <About />
            </Suspense>
        } />

        <Route path="/contact" element={
            <Suspense fallback={<Loading />}>
                <Contact />
            </Suspense>
        } />

        <Route path="/cart" element={
            <Suspense fallback={<Loading />}>
                <Cart />
            </Suspense>
        } />
    </Routes>
)

export default AppRoutes;