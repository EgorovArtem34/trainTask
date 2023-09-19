import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { TableServers } from "../TableServers/TableServers";
import styles from "./serversAndPc.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import { IServers } from "../../types";
import { Pagination } from "../Pagination/Pagination";
import { createPageNumbers } from "../../utils/utils";
import { SearchInput } from "../SearchInput/SearchInput";
import { FiltersServers } from "../FiltersServers/FiltersServers";
import { SelectPageCount } from "../SelectPageCount/SelectPageCound";

export const ServersAndPc = () => {
  const { filteredAndSearchedServers, serversPerPage } = useAppSelector(
    (state) => state.serversSlice
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServers, setCurrentServers] = useState<IServers[]>(
    filteredAndSearchedServers
  );
  const [indexOfLastPost, setIndexOfLastPost] = useState(
    currentPage * serversPerPage
  );
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(1);
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    if (currentServers.length === 0) {
      setCurrentPage(1);
    }
  }, [currentServers.length]);

  useEffect(() => {
    setIndexOfLastPost(currentPage * serversPerPage);
    setIndexOfFirstPost(indexOfLastPost - serversPerPage);
    const serversOn1Page = filteredAndSearchedServers.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    setCurrentServers(serversOn1Page);
  }, [
    currentPage,
    filteredAndSearchedServers,
    indexOfFirstPost,
    indexOfLastPost,
    serversPerPage,
  ]);

  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(
    filteredAndSearchedServers.length,
    serversPerPage
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Серверы и ПК</h1>
      <div className={styles.interface}>
        <p className={styles.info}>
          Записи {indexOfFirstPost === 0 ? 1 : indexOfFirstPost}-
          {indexOfLastPost} из {filteredAndSearchedServers.length}
        </p>
        <div className={styles.searchAndFilter}>
          <SearchInput queryParams={queryParams} />
          <FiltersServers queryParams={queryParams} />
        </div>
      </div>
      <TableServers servers={currentServers} />
      <div className={styles.paginationAndPageCount}>
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers.length}
          onPageChange={handlePageChange}
        />
        <SelectPageCount />
      </div>
    </main>
  );
};
