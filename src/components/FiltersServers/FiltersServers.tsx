import { useState, useEffect } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { Button } from "../../ui/Button/Button";
import styles from "./filtersServers.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MultipleSelect from "../../ui/MultipleSelect/MultipleSelect";
import { searchedAndFilterServers, setSelectedFilters } from "../../store/slices/serversSlice";
import { IOptions } from "../../types";

export const FiltersServers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptionTags, setSelectedOptionTags] = useState<IOptions[]>([]);
  const [selectedOptionPC, setSelectedOptionPC] = useState<IOptions[]>([]);
  const dispatch = useAppDispatch();
  const {
    selectedFilters: { typePC, tags },
    filteredAndSearchedServers,
    servers,

  } = useAppSelector((state) => state.serversSlice);

  useEffect(() => {

  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSelectedFilters({
      typePC: selectedOptionPC,
      tags: selectedOptionTags,
    }))
    dispatch(searchedAndFilterServers());
    setIsMenuOpen(false);
  };
  console.log(typePC);
  const handleClose = () => {
    setIsMenuOpen(false);
    dispatch(setSelectedFilters({
      typePC: [],
      tags: [],
    }));
    dispatch(searchedAndFilterServers());
    setSelectedOptionTags([]);
    setSelectedOptionPC([]);
  };

  const optionsForTags = () => {
    const uniqueTagsSet = [
      ...new Set(servers.flatMap((server) => server.tags)),
    ];
    return uniqueTagsSet.map((tag) => ({
      value: tag,
      label: tag,
      color: tag.split(" ")[0],
    }));
  };

  const optionsForPC = () => {
    const uniquePCSet = [...new Set(servers.flatMap((server) => server.type))].filter((PC) => PC.length > 0);
    return uniquePCSet.map((PC) => ({
      value: PC,
      label: PC,
    }));
  };

  return (
    <div className={styles.filter}>
      <Button
        variant="filter"
        aria-label="фильтрация записей"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <AiOutlineFilter />
      </Button>
      {isMenuOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h4 className={styles.formTitle}>Фильтры</h4>
          <label>
            Тип ПК
            <MultipleSelect
              defaultValue=""
              options={optionsForPC()}
              placeholder="Выбрать"
              value={selectedOptionPC}
              onChange={(options: IOptions[]) => setSelectedOptionPC(options)}
            // onChange={(selectedUsers: Option[]) => handleSelectChange(selectedUsers)}
            />
          </label>
          <label>
            Теги
            <MultipleSelect
              defaultValue=""
              options={optionsForTags()}
              placeholder="Выбрать"
              isCustomColor={true}
              value={selectedOptionTags}
              onChange={(options: IOptions[]) => setSelectedOptionTags(options)}
            // onChange={(selectedUsers: Option[]) => handleSelectChange(selectedUsers)}
            />
          </label>
          <div className={styles.btns}>
            <Button type="submit" variant="submit" aria-label="применить сортировку">Применить</Button>
            <Button variant="reset" onClick={handleClose} aria-label="закрыть меню">Сбросить</Button>
          </div>
        </form>
      )}
    </div>
  );
};
