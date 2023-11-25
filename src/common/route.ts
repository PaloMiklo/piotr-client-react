export enum ROUTE {
    ROOT = "/",
    PRODUCT_DETAIL = "/products/:id",
    ABOUT = "/about",
    CONTACT = "/contact",
    CART = "/cart",
    CHECKOUT = 'cart/checkout',
    WILDCART = "/*"
}

type TDynamicRoutes = ROUTE.PRODUCT_DETAIL;

export const ROUTE_DYNAMIC: Record<TDynamicRoutes, <A>(arg?: A) => string> = {
    [ROUTE.PRODUCT_DETAIL]: <A = string>(id: A) => `${ROUTE.PRODUCT_DETAIL}`.replace(':id', <string>id),
};