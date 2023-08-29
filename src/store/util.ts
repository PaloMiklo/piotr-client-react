import { AnyAction } from "@reduxjs/toolkit";

export const action = <P>(type: string, payload?: P): AnyAction => ({ type: type, payload: payload });