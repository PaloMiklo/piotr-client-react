export interface IOrder {
    customer: ICustomer,
    deliveryOptionItemCode: string; // IDeliveryOption | string; // TODO: should be chosen in in the summary, since the cost is a part of the counter, so probably redundant here afterwards
    billingOptionItemCode: string; // IBillingOption | string;
    cart: ICart,
    createdUi: string,
    comment?: string,
    id?: number
};

export interface ICustomer {
    firstname: string;
    lastname: string;
    message?: string;
    email: string;
    shippingAddress: IShippingAddress;
    billingAddress: IBillingAddress;
}

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
export interface ICartRecalculateDto {
    cartLines: ICartLine[];
    deliveryPrice: number
}

// CartRecalculateResultDto
export interface ICartRecalculateResultDto { cartPrice: number, cartPriceTotal: number }

export interface ICartLine {
    product: IProduct,
    amount: number
};

// IPaidOptionItem
export interface IBillingOption {
    code: string;
    name: string;
    price: number;
};
export interface IDeliveryOption {
    code: string;
    name: string;
    price: number;
};

export interface IShippingAddress {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    country: string;
}
export interface IBillingAddress {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    country: string;
}

export interface ICart {
    lines: ICartLine[];
    deliveryOption: IDeliveryOption | null;
    deliveryPrice: number;
    freeShipping: boolean;
    itemCount: number;
    cartPrice: number;
    cartPriceTotal: number;
};

export interface IConfig {
    apiPrefix: string,
    apiKey: string,
    protocol: string;
    freeShipping: number;
    port: number;
    apiVersion: string;
    delivery: IDeliveryOption[];
    billing: IBillingOption[];
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
