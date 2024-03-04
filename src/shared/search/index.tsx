import React, {useState} from 'react';
import SearchPic from './search.svg';
import s from './style.module.scss';

interface ISearch {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Search = ({searchQuery, onSearch}: ISearch) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={s.search}>
      <button id='searchButton' className={s.searchButton} onClick={toggleInputVisibility}>
        <img src={SearchPic} alt='Search icon'/>
      </button>

      <input
        id="searchInput"
        data-testid="searchInput"
        className={`${s.searchInput} ${isInputVisible ? s.searchInputActive : ''}`}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;