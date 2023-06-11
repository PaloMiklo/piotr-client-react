import { RootState } from "../store/store";

export const selectConfig = (state: RootState) => state.config.value;
