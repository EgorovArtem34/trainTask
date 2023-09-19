import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serversData } from "../../utils/constants";

const initialState = {
  servers: serversData,
};

const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    searchedAndFilterServers: (state, { payload }: PayloadAction<any>) => {
      console.log(state, payload);
    },
  },
});

export const { searchedAndFilterServers } = serversSlice.actions;
export default serversSlice.reducer;
