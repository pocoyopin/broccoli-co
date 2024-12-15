import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

export function profileReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    default:
      return state;
  }
}
