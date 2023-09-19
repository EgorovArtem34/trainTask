import { useState, useEffect } from 'react';
import { TableServers } from '../TableServers/TableServers';
import styles from './serversAndPc.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IServers } from '../../types';
import { Pagination } from '../Pagination/Pagination';
import { createPageNumbers } from '../../utils/utils';

export const ServersAndPc = () => {
  const dispatch = useAppDispatch();
  const { filteredAndSearchedServers, serversPerPage } = useAppSelector((state) => state.serversSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServers, setCurrentServers] = useState<IServers[]>(filteredAndSearchedServers);

  useEffect(() => {
    if (currentServers.length === 0) {
      setCurrentPage(1);
    }
  }, [currentServers.length]);

  useEffect(() => {
    const indexOfLastPost = currentPage * serversPerPage;
    const indexOfFirstPost = indexOfLastPost - serversPerPage;
    const serversOn1Page = filteredAndSearchedServers.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentServers(serversOn1Page);
  }, [currentPage, filteredAndSearchedServers, serversPerPage]);

  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(filteredAndSearchedServers.length, serversPerPage);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Серверы и ПК</h1>
      <span>Записи 1-X из X</span>
      <TableServers servers={currentServers} />
      <Pagination currentPage={currentPage} totalPages={pageNumbers.length} onPageChange={handlePageChange} />
    </main>
  )
}
