import { IConfig } from "../../model/config";
import { WRAPPER_KEY } from "../constant/slice";
import { store } from "../store";

export const selectConfig = (): IConfig => store.getState().config[WRAPPER_KEY];
export const selectDoMock = (): boolean => store.getState().config[WRAPPER_KEY].doMock;