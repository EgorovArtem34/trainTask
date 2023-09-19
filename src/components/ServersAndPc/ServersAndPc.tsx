import { useState } from 'react';
import { TableServers } from '../TableServers/TableServers';
import styles from './serversAndPc.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const ServersAndPc = () => {
  const dispatch = useAppDispatch();
  const { servers } = useAppSelector((state) => state.serversSlice);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Серверы и ПК</h1>
      <span>Записи 1-X из X</span>
      <TableServers servers={servers} />
    </main>
  )
}
