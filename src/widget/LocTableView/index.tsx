import React, {useEffect, useState} from "react";
import Search from "@shared/search";
import Pagination from "@shared/pagination";
import {useAppDispatch, useAppSelector} from "@app/store.ts";
import LocationTable from "@features/locations/ui/locationTable";
import {getLocationByPage, searchLocationByName} from "@features/locations/model/locationsThunks.ts";


const LocTableView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: locations,
    pageInfo,
    loading,
    error
  } = useAppSelector((state) => state.locations);

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('locationsCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    dispatch(searchLocationByName({name: query, page: 1}));
  };

  useEffect(() => {
    localStorage.setItem('locationsCurrentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchLocationByName({name: searchQuery, page: currentPage}));
    } else {
      dispatch(getLocationByPage(currentPage));
    }
    // window.scrollTo(0, 0);
  }, [dispatch, currentPage, searchQuery]);

  let content;

  if (error || locations.length === 0) {
    content = <div className='text-center'>Sorry, no locations found.</div>;
  } else {
    content =
      <>
        <LocationTable locations={locations}/>
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

export default LocTableView;