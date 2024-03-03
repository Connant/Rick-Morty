import {Character} from "@shared/types/characters/types.ts";

interface CharactersState {
  entities: Character[];
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

export const initialState: CharactersState = {
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