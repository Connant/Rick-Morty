import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@app/store.ts";
import {getLocation} from "@features/locations/model/locationsThunks.ts";
import CardLocation from "@shared/cardLocation";


const LocGridView: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    entities: locations,
    pageInfo,
    loading,
    isPageLoading
  } = useAppSelector((state) => state.locations);


  const loadMoreLocations = useCallback(() => {
    if (pageInfo.next && loading === 'succeeded' && !isPageLoading) {
      dispatch(getLocation(pageInfo.count + 1));
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
    dispatch(getLocation(1));
  }, [dispatch]);


  return (
    <div className='main mx-auto'>
      <ul className='grid grid-cols-4 gap-x-5 gap-y-10'>
        {locations.map((location) => (
          <CardLocation location={location} key={location.id}/>
        ))}
      </ul>

      {loading === 'pending' && <p>Loading more characters...</p>}

    </div>
  );
};

export default LocGridView;
