import React, {useState} from 'react';
import SearchPic from './search.svg';
import s from './style.module.scss';

interface ISearch {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<ISearch> = ({searchQuery, onSearch}) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={s.search}>
      <button className={s.searchButton} onClick={toggleInputVisibility}>
        <img src={SearchPic} alt='Search icon'/>
      </button>

      <input
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