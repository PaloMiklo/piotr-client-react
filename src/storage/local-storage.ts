import { ICart, IDeliveryOption } from "../model/config";

export enum LOCAL_STORAGE_KEY {
    CART = 'CART',
    DELIVERY = 'DELIVERY'
}

type TStorables = ICart | IDeliveryOption;

export enum LOCAL_STORAGE_OPERATION {
    STORE = 'STORE',
    RETRIEVE = 'RETRIEVE',
    REMOVE = 'REMOVE',
    CLEAR = 'CLEAR'
}

const TTL_DEFAULT = '7 * 24 * 60 * 60 * 1000';

type TStoreFn = (key: string, v: TStorables, ttl?: string) => void;
type TRetrieveFn = (key: string) => TStorables | null;
type TRemoveFn = (key: string) => void;
type TResetFn = () => void;

interface ILocalStorageMap {
    [LOCAL_STORAGE_OPERATION.STORE]: TStoreFn;
    [LOCAL_STORAGE_OPERATION.RETRIEVE]: TRetrieveFn;
    [LOCAL_STORAGE_OPERATION.REMOVE]: TRemoveFn;
    [LOCAL_STORAGE_OPERATION.CLEAR]: TResetFn;
}

export const LOCAL_STORAGE: ILocalStorageMap = {
    [LOCAL_STORAGE_OPERATION.STORE]: (key: string, value: TStorables, ttl?: string): void => {
        try {
            const now = new Date().getTime();
            const evalTtl = (() => +`${ttl ?? TTL_DEFAULT}`)();
            const serializedValue = JSON.stringify({ ...value, expiration: now + evalTtl });
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    },

    [LOCAL_STORAGE_OPERATION.RETRIEVE]: (key: string): TStorables | null => {
        try {
            const serializedValue = localStorage.getItem(key);
            const current = (serializedValue === null) ? null : JSON.parse(serializedValue) as TStorables & { expiration: number };
            const now = new Date();
            if (current && current!.expiration && now.getTime() > +current!.expiration) {
                LOCAL_STORAGE[LOCAL_STORAGE_OPERATION.REMOVE](key);
                return null;
            }
            return current;
        } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
            return null;
        }
    },

    [LOCAL_STORAGE_OPERATION.REMOVE]: (key: string): void => localStorage.removeItem(key),

    [LOCAL_STORAGE_OPERATION.CLEAR]: (): void => localStorage.clear()

}