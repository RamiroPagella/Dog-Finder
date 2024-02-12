import { ChangeEvent, useState } from 'react';
import style from './searchBar.module.scss';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }


  return (
    <input className={style.SearchBar} onChange={handleChange} value={inputValue} />  
  )
}

export default SearchBar;