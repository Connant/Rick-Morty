import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@features/characters/model/hooks.ts";
import {getCharacters} from "@features/characters/model/charactersThunks.ts";
import Card from "@shared/card";


const ChGridView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: characters,
    pageInfo,
    loading,
    isPageLoading
  } = useAppSelector((state) => state.characters);


  const loadMoreCharacters = useCallback(() => {
    if (pageInfo.next && loading === 'succeeded' && !isPageLoading) {
      dispatch(getCharacters(pageInfo.count + 1));
    }
  }, [dispatch, pageInfo, loading, isPageLoading]);

  const onScroll = useCallback(() => {

    const bottomOffset = 200;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - bottomOffset
    ) {
      loadMoreCharacters();
    }
  }, [loadMoreCharacters]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    const pageToLoad = savedPage ? parseInt(savedPage) : 1;
    dispatch(getCharacters(pageToLoad));
  }, [dispatch]);


  return (
    <div className='main mx-auto'>
      <ul className='grid grid-cols-4 gap-x-5 gap-y-10'>
        {characters.map((character) => (
          <Card character={character} key={character.id}/>
        ))}
      </ul>

      {loading === 'pending' && <p>Loading more characters...</p>}

    </div>
  );
};

export default ChGridView;
