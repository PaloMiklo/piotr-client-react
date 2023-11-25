import { IConfig, ProductRowDto } from "../../model/config";

export const configInitial: IConfig = {
    apiPrefix: "",
    apiKey: "",
    freeShipping: 0,
    protocol: "",
    port: 0,
    doMock: true,
    apiVersion: "",
    delivery: [],
    mocks: {
        products: [],
        deletedProducts: [],
        product: {} as ProductRowDto,
        orders: []
    },
    mockSendOrder: {},
    perPageDefault: 0,
    pageOptions: [],
    storageExpiration: "",
    countries: []
};