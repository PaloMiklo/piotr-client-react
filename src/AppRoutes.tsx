import { ComponentType, lazy, ReactElement, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { TProductProps } from "./components/products/product/Product.config";
import { IProduct } from "./model/config";

const Loading = lazy((): Promise<{ default: ComponentType<{}> }> => import('./components/loading/Loading'));
const Products = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/products/Products'));
const Product = lazy((): Promise<{ default: ComponentType<TProductProps>; }> => import('./components/products/product/Product'));
const About = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/about/About'));
const Contact = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/contact/Contact'));
const Cart = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/cart/Cart'));
const Checkout = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/checkout/Checkout'));
const NotFound = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/not-found/NotFound'));

const AppRoutes = (): ReactElement => (
    <Routes>
        <Route path="/" element={
            <Suspense fallback={<Loading />}>
                <Products />
            </Suspense>
        } />

        <Route path="/products/:id" element={
            <Suspense fallback={<Loading />}>
                <Product product={{} as IProduct}></Product>
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

        <Route path="/cart/checkout" element={
            <Suspense fallback={<Loading />}>
                <Checkout />
            </Suspense>
        } />

        <Route path="/*" element={
            <Suspense fallback={<Loading />}>
                <NotFound />
            </Suspense>
        } />
    </Routes>
)

export default AppRoutes;