import { ChangeEvent, useEffect, useState } from "react";
import style from "./searchBar.module.scss";
import {
  usePagingContext,
  useSearcAndfiltersContext,
} from "../../hooks/contextHooks";
import { Search } from "../../assets/icons";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setSearchAndFilters } = useSearcAndfiltersContext();
  const { setCurrentPage } = usePagingContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCurrentPage(1);
      setSearchAndFilters((prev) => ({
        ...prev,
        search: inputValue,
      }));
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={style.SearchBarContainer}>
      <input
        onChange={handleChange}
        value={inputValue}
      />

      <Search className={style.icon} />

    </div>
  );
};

export default SearchBar;
