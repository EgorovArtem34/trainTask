import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./searchInput.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  searchedAndFilterServers,
  setSearchQuery,
} from "../../store/slices/serversSlice";
import { IQueryParamsProps } from "../../store/types";

export const SearchInput = ({ queryParams }: IQueryParamsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const timeout = 500;
  const { searchQuery } = useAppSelector((state) => state.serversSlice);
  const [searchQueryInput, setSearchQueryInput] = useState(
    queryParams.get("search_val") || ""
  );
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    setSearchQueryInput(queryParams.get("search_val") || "");
    dispatch(setSearchQuery(searchQueryInput));
  }, [location.search, queryParams, dispatch, searchQueryInput]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newSearchQuery = e.target.value;
    setSearchQueryInput(newSearchQuery);
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    if (newSearchQuery.trim() !== "") {
      queryParams.set("search_val", newSearchQuery);
    } else {
      queryParams.delete("search_val");
    }
    navigate(`?${queryParams.toString()}`);

    const newTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery(newSearchQuery));
    }, timeout);
    setSearchTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    dispatch(searchedAndFilterServers());
  }, [dispatch, searchQuery]);

  return (
    <div className={styles.inputContainer}>
      <input
        type="search"
        placeholder="Введите название записи"
        className={styles.inputSearch}
        value={searchQueryInput}
        onChange={handleChange}
      />
      <div className={styles.inputLoupe}>
        <AiOutlineSearch />
      </div>
    </div>
  );
};
