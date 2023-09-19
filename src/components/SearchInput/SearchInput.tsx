import { useState, ChangeEvent, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './searchInput.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { searchedAndFilterServers, setSearchQuery } from '../../store/slices/serversSlice';

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const timeout = 500;
  const { searchQuery } = useAppSelector((state) => state.serversSlice);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newSearchQuery = e.target.value;
    setSearchQueryInput(newSearchQuery);

    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }
    const newTimeoutId = setTimeout(() => dispatch(setSearchQuery(newSearchQuery)), timeout);
    setSearchTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    dispatch(searchedAndFilterServers());
  }, [dispatch, searchQuery])

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
