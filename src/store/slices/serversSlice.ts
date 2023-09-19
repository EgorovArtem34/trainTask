import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serversData } from "../../utils/constants";
import { IActionChecked } from "../types";

const initialState = {
  servers: serversData,
  filteredAndSearchedServers: serversData,
  serversPerPage: 10,
};

const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    searchedAndFilterServers: (state, { payload }: PayloadAction<any>) => {
      console.log(state, payload);
    },
    setCheckedServers: (state, { payload }: PayloadAction<IActionChecked>) => {
      const { currentId, newValue } = payload;
      if (currentId === 'all') {
        state.filteredAndSearchedServers = state.filteredAndSearchedServers.map((server) => ({
          ...server,
          isChecked: newValue
        }));
      } else {
        state.filteredAndSearchedServers = state.filteredAndSearchedServers.map(
          (server) =>
            server.id === currentId ? { ...server, isChecked: newValue } : server
        );
      }
    },
  },
});

export const { searchedAndFilterServers, setCheckedServers } = serversSlice.actions;
export default serversSlice.reducer;
