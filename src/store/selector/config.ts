import { IConfig } from "../../model/config";
import { store } from "../store";

export const selectConfig = (): IConfig => store.getState().config.value;
export const selectDoMock = (): boolean => store.getState().config.value.doMock;