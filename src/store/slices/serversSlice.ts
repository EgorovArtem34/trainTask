import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serversData } from "../../utils/constants";
import { IActionChecked, ISelectedFilters, iServerSliceState } from "../types";

const initialState: iServerSliceState = {
  servers: serversData,
  filteredAndSearchedServers: serversData,
  serversPerPage: 10,
  searchQuery: "",
  selectedFilters: {
    typePC: [],
    tags: [],
  },
};

const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    searchedAndFilterServers: (state) => {
      state.filteredAndSearchedServers = state.servers.filter((server) => {
        const tagValues = state.selectedFilters.tags.map((tag) => tag.value);
        const PCValues = state.selectedFilters.typePC.map((pc) => pc.value);
        const haveTags =
          state.selectedFilters.tags.length > 0
            ? server.tags.some((tag) => tagValues.includes(tag))
            : true;
        const havePC =
          state.selectedFilters.typePC.length > 0
            ? PCValues.includes(server.type)
            : true;
        return (
          server.name
            .toLocaleLowerCase()
            .includes(state.searchQuery.toLocaleLowerCase()) &&
          haveTags &&
          havePC
        );
      });
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setSelectedFilters: (
      state,
      { payload }: PayloadAction<ISelectedFilters>
    ) => {
      state.selectedFilters = payload;
    },
    setCheckedServers: (state, { payload }: PayloadAction<IActionChecked>) => {
      const { currentId, newValue } = payload;
      if (currentId === "all") {
        state.filteredAndSearchedServers = state.filteredAndSearchedServers.map(
          (server) => ({
            ...server,
            isChecked: newValue,
          })
        );
      } else {
        state.filteredAndSearchedServers = state.filteredAndSearchedServers.map(
          (server) =>
            server.id === currentId
              ? { ...server, isChecked: newValue }
              : server
        );
      }
    },
  },
});

export const {
  searchedAndFilterServers,
  setCheckedServers,
  setSearchQuery,
  setSelectedFilters,
} = serversSlice.actions;
export default serversSlice.reducer;
