import React, {useCallback, useEffect} from "react";
import {getCharacters} from "@features/characters/model/charactersThunks.ts";
import {useAppDispatch, useAppSelector} from "@app/store.ts";
import CardCharacter from "@shared/cardCharacter";


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
    dispatch(getCharacters(1));
  }, [dispatch]);


  return (
    <div className='main mx-auto'>
      <ul className='grid mt-10 grid-cols-4 gap-x-5 gap-y-10'>
        {characters.map((character) => (
          <CardCharacter character={character} key={character.id}/>
        ))}
      </ul>

      {loading === 'pending' && <p>Loading more characters...</p>}

    </div>
  );
};

export default ChGridView;
