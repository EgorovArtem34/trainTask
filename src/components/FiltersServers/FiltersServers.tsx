import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";
import { Button } from "../../ui/Button/Button";
import styles from "./filtersServers.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MultipleSelect from "../../ui/MultipleSelect/MultipleSelect";
import {
  searchedAndFilterServers,
  setSelectedFilters,
} from "../../store/slices/serversSlice";
import { IOptions } from "../../types";
import { IQueryParamsProps } from "../../store/types";

export const FiltersServers = ({ queryParams }: IQueryParamsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptionTags, setSelectedOptionTags] = useState<IOptions[]>([]);
  const [selectedOptionPC, setSelectedOptionPC] = useState<IOptions[]>([]);
  const dispatch = useAppDispatch();
  const { servers } = useAppSelector((state) => state.serversSlice);
  const navigate = useNavigate();

  useEffect(() => {
    const typePCParam = queryParams.get("typePC")?.split(",");
    const tagsParam = queryParams.get("tags")?.split(",");

    if (typePCParam || tagsParam) {
      const newParamsPC =
        typePCParam?.map((value) => ({ value, label: value })) || [];
      const newParamsTag =
        tagsParam?.map((value) => ({
          value,
          label: value,
          color: value.split(" ")[0],
        })) || [];
      newParamsTag.length > 0 && setSelectedOptionTags(newParamsTag);
      newParamsPC.length > 0 && setSelectedOptionPC(newParamsPC);
      dispatch(
        setSelectedFilters({
          typePC: newParamsPC,
          tags: newParamsTag,
        })
      );
      dispatch(searchedAndFilterServers());
    }
  }, [dispatch, queryParams]);

  const clearFilterParams = () => {
    queryParams.delete("typePC");
    queryParams.delete("tags");
    navigate(`?${queryParams.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearFilterParams();
    dispatch(
      setSelectedFilters({
        typePC: selectedOptionPC,
        tags: selectedOptionTags,
      })
    );

    const typePCParam = selectedOptionPC
      .map((option) => option.value)
      .join(",");
    const tagsParam = selectedOptionTags
      .map((option) => option.value)
      .join(",");

    typePCParam && queryParams.set("typePC", typePCParam);
    tagsParam && queryParams.set("tags", tagsParam);

    navigate(`?${queryParams.toString()}`);
    dispatch(searchedAndFilterServers());
    setIsMenuOpen(false);
    dispatch(searchedAndFilterServers());
    setIsMenuOpen(false);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    dispatch(
      setSelectedFilters({
        typePC: [],
        tags: [],
      })
    );
    dispatch(searchedAndFilterServers());
    setSelectedOptionTags([]);
    setSelectedOptionPC([]);
    clearFilterParams();
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
    const uniquePCSet = [
      ...new Set(servers.flatMap((server) => server.type)),
    ].filter((PC) => PC.length > 0);
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
            />
          </label>
          <div className={styles.btns}>
            <Button
              type="submit"
              variant="submit"
              aria-label="применить сортировку"
            >
              Применить
            </Button>
            <Button
              variant="reset"
              onClick={handleClose}
              aria-label="закрыть меню"
            >
              Сбросить
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
