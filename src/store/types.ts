import { IOptions, IServers } from "../types";

export interface IActionChecked {
  currentId: number | string;
  newValue: boolean;
}

export interface ISelectedFilters {
  typePC: IOptions[];
  tags: IOptions[];
}

export interface iServerSliceState {
  servers: IServers[];
    filteredAndSearchedServers: IServers[];
    serversPerPage: number;
    searchQuery: string;
    selectedFilters: ISelectedFilters;
}

export interface IQueryParamsProps {
  queryParams: URLSearchParams;
}
