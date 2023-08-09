import { RootState } from "../store";

export const selectConfig = (state: RootState) => state.config.value;
