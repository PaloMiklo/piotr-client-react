import { IConfig, IOrder, IProduct } from "../../model/config";

export const configInitial: IConfig = {
    apiPrefix: "",
    apiKey: "",
    freeShipping: 0,
    protocol: "",
    port: 0,
    doMock: false,
    apiVersion: "",
    delivery: [],
    billing: [],
    mocks: {
        products: [],
        deletedProducts: [],
        product: {} as IProduct,
        orders: []
    },
    mockSendOrder: {} as IOrder,
    perPageDefault: 0,
    pageOptions: [],
    storageExpiration: "",
    countries: []
};