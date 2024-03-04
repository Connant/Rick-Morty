import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@app/store.ts";
import CardEpisodes from "@shared/cardEpisodes";
import {getEpisodes} from "@features/episodes/model/episodesThunks.ts";


const EpGridView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: episodes,
    pageInfo,
    loading,
    isPageLoading
  } = useAppSelector((state) => state.episodes);


  const loadMoreLocations = useCallback(() => {
    if (pageInfo.next && loading === 'succeeded' && !isPageLoading) {
      dispatch(getEpisodes(pageInfo.count + 1));
    }
  }, [dispatch, pageInfo, loading, isPageLoading]);

  const onScroll = useCallback(() => {

    const bottomOffset = 200;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - bottomOffset
    ) {
      loadMoreLocations();
    }
  }, [loadMoreLocations]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    const pageToLoad = savedPage ? parseInt(savedPage) : 1;
    dispatch(getEpisodes(pageToLoad));
  }, [dispatch]);


  return (
    <div className='main mx-auto'>
      <ul className='grid mt-10 grid-cols-4 gap-x-5 gap-y-10'>
        {episodes.map((episode) => (
          <CardEpisodes episodes={episode} key={episode.id}/>
        ))}
      </ul>

      {loading === 'pending' && <p>Loading more characters...</p>}

    </div>
  );
};

export default EpGridView;
