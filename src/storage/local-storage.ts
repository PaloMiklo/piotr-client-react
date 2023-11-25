import { ICart } from "../model/config";

export enum LOCAL_STORAGE_OPERATION {
    STORE = 'STORE',
    RETRIEVE = 'RETRIEVE',
    CLEAR = 'CLEAR'
}
type TStoreFn = <T = ICart>(key: string, v: T) => void;
type TRetrieveFn = <T = ICart>(key: string) => T | null;
type TResetFn = () => void;

interface ILocalStorageMap {
    [LOCAL_STORAGE_OPERATION.STORE]: TStoreFn;
    [LOCAL_STORAGE_OPERATION.RETRIEVE]: TRetrieveFn;
    [LOCAL_STORAGE_OPERATION.CLEAR]: TResetFn;
}

export const LOCAL_STORAGE: ILocalStorageMap = {
    [LOCAL_STORAGE_OPERATION.STORE]: <S = ICart>(key: string, value: S): void => {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    [LOCAL_STORAGE_OPERATION.RETRIEVE]: <R = ICart>(key: string): R | null => {
        try {
            const serializedValue = localStorage.getItem(key);
            return (serializedValue === null) ? null : JSON.parse(serializedValue);
        } catch (error) {
            console.error('Error retrieving from localStorage:', error);
            return null;
        }
    },

    [LOCAL_STORAGE_OPERATION.CLEAR]: (): void => localStorage.clear()

}