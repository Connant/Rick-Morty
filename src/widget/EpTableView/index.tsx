import React, {useEffect, useState} from "react";
import Search from "@shared/search";
import Pagination from "@shared/pagination";
import {useAppDispatch, useAppSelector} from "@app/store.ts";
import EpisodesTable from "@features/episodes/ui/episodesTable";
import {getEpisodesByPage, searchEpisodesByName} from "@features/episodes/model/episodesThunks.ts";


const EpTableView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: episodes,
    pageInfo,
    loading,
    error
  } = useAppSelector((state) => state.episodes);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('episodesCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    dispatch(searchEpisodesByName({name: query, page: 1}));
  };

  useEffect(() => {
    localStorage.setItem('episodesCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchEpisodesByName({name: searchQuery, page: currentPage}));
    } else {
      dispatch(getEpisodesByPage(currentPage));
    }
    // window.scrollTo(0, 0);
  }, [dispatch, currentPage, searchQuery]);

  let content;

  if (error) {
    content = <div className='text-center'>Sorry, no episodes found.</div>;
  } else {
    content =
      <>
        <EpisodesTable episodes={episodes}/>
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

export default EpTableView;