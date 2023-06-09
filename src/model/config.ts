export interface IOrder { }

export interface IProduct { }

export interface IDeliveryOption {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface IConfig {
    apiPrefix: string,
    apiKey: string,
    protocol: string;
    freeShipping: number;
    port: number;
    apiVersion: string;
    delivery: IDeliveryOption[];
    doMock: boolean;
    mocks: IMocks[];
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
}

export interface IPageOption {
    text: string;
    value: string;
}

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
}

export enum MocksKeys {
    PRODUCTS = 'products',
    PRODUCT = 'product',
    ORDERS = 'orders',
    DELETED_PRODUCTS = 'deletedProducts',
    MOCK_SEND_ORDER = 'mockSendOrder',
}
