import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@features/characters/model/hooks.ts";
import {getCharactersByPage, searchCharactersByName} from "@features/characters/model/charactersThunks.ts";
import Search from "@shared/search";
import CharactersTable from "@shared/charactersTable";
import Pagination from "@shared/pagination";


const ChTableView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: characters,
    pageInfo,
    loading
  } = useAppSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    dispatch(searchCharactersByName({name: query, page: 1}));
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchCharactersByName({name: searchQuery, page: currentPage}));
    } else {
      dispatch(getCharactersByPage(currentPage));
    }
    // window.scrollTo(0, 0); // Скролл вверх при загрузке новых данных
  }, [dispatch, currentPage, searchQuery]);


  return (
    <div className='main mx-auto'>
      <Search searchQuery={searchQuery} onSearch={handleSearch}/>
      <CharactersTable characters={characters}/>
      <Pagination pageInfo={pageInfo} currentPage={currentPage} loading={loading} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default ChTableView;