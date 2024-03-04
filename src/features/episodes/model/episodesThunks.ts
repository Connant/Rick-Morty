import {createAsyncThunk} from "@reduxjs/toolkit";
import {IEpisodes} from "@shared/types/episodes";
import {IInfo} from "@shared/types/common/types.ts";
import {fetchEpisodes, fetchEpisodesByName} from "@features/episodes/lib/episodesAPI.ts";


export const getEpisodes = createAsyncThunk<
  { episodes: IEpisodes[]; pageInfo: IInfo },
  number,
  {
    rejectValue: string
  }
>('episodes/fetchEpisodes',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchEpisodes(page);
      return {
        episodes: response.results,
        pageInfo: response.info
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  });


export const searchEpisodesByName = createAsyncThunk<
  { episodes: IEpisodes[]; pageInfo: IInfo },
  { name: string; page: number },
  { rejectValue: string }
>(
  'episodes/fetchEpisodesByName',
  async ({ name, page }, { rejectWithValue }) => {
    try {
      const response = await fetchEpisodesByName(name, page);
      return {
        episodes: response.results,
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

export const getEpisodesByPage = createAsyncThunk<
  { episodes: IEpisodes[]; pageInfo: IInfo },
  number,
  { rejectValue: string }
>(
  'location/fetchEpisodesByPage',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchEpisodes(page);
      return {
        episodes: response.results,
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