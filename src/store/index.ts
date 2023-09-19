import { configureStore } from "@reduxjs/toolkit";
import serversSlice from "./slices/serversSlice";

const store = configureStore({
  reducer: {
    serversSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
