import {createAsyncThunk} from "@reduxjs/toolkit";
import {IInfo} from "@shared/types/common/types.ts";
import {ILocation} from "@shared/types/location/types.ts";
import {fetchLocation, fetchLocationByName} from "@features/locations/lib/locationsAPI.ts";

export const getLocation = createAsyncThunk<
  { location: ILocation[]; pageInfo: IInfo },
  number,
  {
    rejectValue: string
  }
>('location/fetchLocation',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchLocation(page);
      return {
        location: response.results,
        pageInfo: response.info
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  });


export const searchLocationByName = createAsyncThunk<
  { location: ILocation[]; pageInfo: IInfo },
  { name: string; page: number },
  { rejectValue: string }
>(
  'location/fetchLocationByName',
  async ({ name, page }, { rejectWithValue }) => {
    try {
      const response = await fetchLocationByName(name, page);
      return {
        location: response.results,
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

export const getLocationByPage = createAsyncThunk<
  { location: ILocation[]; pageInfo: IInfo },
  number,
  { rejectValue: string }
>(
  'location/fetchLocationByPage',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchLocation(page);
      return {
        location: response.results,
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