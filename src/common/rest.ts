export const API_PREFIX = '/api';

export const enum API {
    CONFIG = "config",
    DELIVERIES = "deliveries",
    PRODUCTS = "products",
    PRODUCT_IMAGE = "product_name",
}

export const ENDPOINTS: Record<API, <A = string>(arg?: A) => string> = {
    [API.CONFIG]: (): string => '/config.json',
    [API.DELIVERIES]: (): string => `${API_PREFIX}/payed-option-item`,
    [API.PRODUCTS]: (): string => `${API_PREFIX}/product/list`,
    [API.PRODUCT_IMAGE]: <A = string>(productId: A): string => `${API_PREFIX}/product/${productId}/image`,
};

export type TPAYED_OPTIONS_CODES = 'SHIPPING' | 'PAYMENT';
export const PAYED_OPTIONS_CODE: Record<TPAYED_OPTIONS_CODES, string> = { SHIPPING: 'SHIPPING', PAYMENT: 'PAYMENT' }