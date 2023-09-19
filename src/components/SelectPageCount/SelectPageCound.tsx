import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setServersPerPage } from '../../store/slices/serversSlice';
import styles from './selectPageCound.module.scss';

export const SelectPageCount = () => {
  const dispatch = useAppDispatch();
  const options = [10, 20];
  const { serversPerPage } = useAppSelector((state) => state.serversSlice);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountServersPerPage = Number(e.target.value);
    dispatch(setServersPerPage(newCountServersPerPage));
  };

  const makeOptions = () => options.map((option, i) => (
    <option key={i} value={option} className={styles.option}>
      {option}
    </option>
  ));

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Количество записей
        <select className={styles.select} onChange={handleChange} value={serversPerPage}>
          {makeOptions()}
        </select>
      </label>
    </form>
  )
};
