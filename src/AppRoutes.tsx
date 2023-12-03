import { ComponentType, FC, lazy, LazyExoticComponent, ReactElement, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTE } from "./common/route";

const Loading: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}> }> => import('./components/loading/Loading'));
const Products: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/products/Products'));
const Product: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/products/product/Product'));
const About: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/about/About'));
const Contact: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/contact/Contact'));
const Cart: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/cart/Cart'));
const Checkout: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/checkout/Checkout'));
const NotFound: LazyExoticComponent<ComponentType<{}>> = lazy((): Promise<{ default: ComponentType<{}>; }> => import('./components/not-found/NotFound'));

const AppRoutes: FC = (): ReactElement => (
    <Routes>
        <Route path={ROUTE.ROOT} element={
            <Suspense fallback={<Loading />}>
                <Products />
            </Suspense>
        } />

        <Route path={ROUTE.PRODUCT_DETAIL} element={
            <Suspense fallback={<Loading />}>
                <Product></Product>
            </Suspense>
        } />

        <Route path={ROUTE.ABOUT} element={
            <Suspense fallback={<Loading />}>
                <About />
            </Suspense>
        } />

        <Route path={ROUTE.CONTACT} element={
            <Suspense fallback={<Loading />}>
                <Contact />
            </Suspense>
        } />

        <Route path={ROUTE.CART} element={
            <Suspense fallback={<Loading />}>
                <Cart />
            </Suspense>
        } />

        <Route path={ROUTE.CHECKOUT} element={
            <Suspense fallback={<Loading />}>
                <Checkout />
            </Suspense>
        } />

        <Route path={ROUTE.WILDCART} element={
            <Suspense fallback={<Loading />}>
                <NotFound />
            </Suspense>
        } />
    </Routes>
)

export default AppRoutes;