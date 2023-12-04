export const API_PREFIX = '/api';

export const enum API {
    CONFIG = "config",
    DELIVERY = "deliveries",
    BILLING = 'billings',
    PRODUCTS = "products",
    PRODUCT_IMAGE = "product_name",
    CART_RECALCULATION = 'cart_recalculation'
}

export const ENDPOINTS: Record<API, <A = string>(arg?: A) => string> = {
    [API.CONFIG]: (): string => '/config.json',
    [API.DELIVERY]: (): string => `${API_PREFIX}/paid-option-item`,
    [API.BILLING]: (): string => `${API_PREFIX}/paid-option-item`,
    [API.PRODUCTS]: (): string => `${API_PREFIX}/product/list`,
    [API.PRODUCT_IMAGE]: <A = string>(productId: A): string => `${API_PREFIX}/product/${productId}/image`,
    [API.CART_RECALCULATION]: (): string => `${API_PREFIX}/cart/recalculate`,
};

export type TPAID_OPTIONS_CODES = 'SHIPPING' | 'PAYMENT';
export const PAID_OPTIONS_CODE: Record<TPAID_OPTIONS_CODES, string> = { SHIPPING: 'SHIPPING', PAYMENT: 'PAYMENT' }