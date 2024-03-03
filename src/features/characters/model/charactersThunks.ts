import {createAsyncThunk} from "@reduxjs/toolkit";
import {Character, Info} from "@shared/types/characters/types.ts";
import {fetchCharacters, fetchCharactersByName} from "@features/characters/lib/rickAndMortyAPI.ts";

export const getCharacters = createAsyncThunk<
  { characters: Character[]; pageInfo: Info },
  number,
  {
    rejectValue: string
  }
>('characters/fetchCharacters',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(page);
      return {
        characters: response.results,
        pageInfo: response.info
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  });


export const searchCharactersByName = createAsyncThunk<
  { characters: Character[]; pageInfo: Info },
  { name: string; page: number },
  { rejectValue: string }
>(
  'characters/searchCharactersByName',
  async ({ name, page }, { rejectWithValue }) => {
    try {
      const response = await fetchCharactersByName(name, page);
      return {
        characters: response.results,
        pageInfo: response.info
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const getCharactersByPage = createAsyncThunk<
  { characters: Character[]; pageInfo: Info },
  number,
  { rejectValue: string }
>(
  'characters/fetchCharactersByPage',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(page);
      return {
        characters: response.results,
        pageInfo: response.info
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);