import {ILocation} from "@shared/types/location/types.ts";


interface LocationsState {
  entities: ILocation[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  pageInfo: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  searchParams: {
    name: string;
  };
  isFetching: boolean,
  isPageLoading: boolean,
}

export const initialState: LocationsState = {
  entities: [],
  loading: 'idle',
  error: null,
  pageInfo: {
    count: 1,
    pages: 0,
    next: null,
    prev: null
  },
  searchParams: {
    name: '',
  },
  isFetching: true,
  isPageLoading: false,
};