import React, {useEffect, useState} from "react";
import {getCharactersByPage, searchCharactersByName} from "@features/characters/model/charactersThunks.ts";
import Search from "@shared/search";
import CharactersTable from "@shared/charactersTable";
import Pagination from "@shared/pagination";
import {useAppDispatch, useAppSelector} from "@app/store.ts";


const ChTableView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: characters,
    pageInfo,
    loading,
    error
  } = useAppSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('charactersCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    dispatch(searchCharactersByName({name: query, page: 1}));
  };

  useEffect(() => {
    localStorage.setItem('charactersCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchCharactersByName({ name: searchQuery, page: currentPage }));
    } else {
      dispatch(getCharactersByPage(currentPage));
    }
  }, [dispatch, currentPage, searchQuery]);


  let content;

  if (error) {
    content = <div className='text-center'>Sorry, no characters found.</div>;
  } else {
    content =
      <>
        <CharactersTable characters={characters}/>
        <Pagination pageInfo={pageInfo} currentPage={currentPage} loading={loading} setCurrentPage={setCurrentPage}/>
      </>
  }

  return (
    <div className='main mx-auto'>
      <Search searchQuery={searchQuery} onSearch={handleSearch}/>
      {content}
    </div>
  );
};

export default ChTableView;