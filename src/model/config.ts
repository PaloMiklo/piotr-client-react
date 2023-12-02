export interface IOrder { };


// ProductRowDto
// ProductDetDto
export interface IProduct {
    id: number,
    name: string,
    quantity: number,
    price: number,
    description: string,
    valid: boolean
};

// CartRecalculateDto
export type TCartRecalculateDto = ICartLine;
export interface ICartLine {
    product: IProduct,
    amount: number
};

export interface IDeliveryOption {
    code: string;
    name: string;
    price: number;
};

export interface ICart {
    lines: ICartLine[];
    deliveryOption: IDeliveryOption | null;
    deliveryPrice: number;
    freeShipping: boolean;
    itemCount: number;
    cartPrice: number;
};

export interface IConfig {
    apiPrefix: string,
    apiKey: string,
    protocol: string;
    freeShipping: number;
    port: number;
    apiVersion: string;
    delivery: IDeliveryOption[];
    doMock: boolean;
    mocks: IMocks;
    mockSendOrder: IOrder;
    perPageDefault: number;
    pageOptions: IPageOption[];
    countries: string[];
    storageExpiration: string;
}

export interface IMocks {
    products: IProduct[];
    product: IProduct;
    orders: IOrder[];
    deletedProducts: IProduct[];
};

export interface IPageOption {
    text: string;
    value: string;
};

export enum ConfigKeys {
    PROTOCOL = 'protocol',
    FREE_SHIPPING = 'freeShipping',
    PORT = 'port',
    API_VERSION = 'apiVersion',
    DELIVERY = 'delivery',
    DO_MOCK = 'doMock',
    MOCKS = 'mocks',
    PER_PAGE_DEFAULT = 'perPageDefault',
    PAGE_OPTIONS = 'pageOptions',
    COUNTRIES = 'countries',
    STORAGE_EXPIRATION = 'storageExpiration',
};

export enum MocksKeys {
    PRODUCTS = 'products',
    PRODUCT = 'product',
    ORDERS = 'orders',
    DELETED_PRODUCTS = 'deletedProducts',
    MOCK_SEND_ORDER = 'mockSendOrder',
};
