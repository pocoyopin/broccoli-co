import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./reducer/profile";

// TODO: change reducer name
const store = configureStore({
  reducer: profileReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
