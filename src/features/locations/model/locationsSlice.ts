import { createSlice } from '@reduxjs/toolkit';
import {initialState} from "./locationsState.ts";
import {getLocation, getLocationByPage, searchLocationByName} from "@features/locations/model/locationsThunks.ts";

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
      state.loading = 'pending';
      state.isFetching = true;
      state.isPageLoading = true;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = [...state.entities, ...action.payload.location];
      state.pageInfo = {
        count: action.meta.arg,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isFetching = false;
      state.isPageLoading = false;
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
      state.entities = [];
      state.isFetching = false;
      state.isPageLoading = false;
    });
    builder.addCase(searchLocationByName.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.error = null;
      state.entities = action.payload.location;
      state.pageInfo = {
        count: action.meta.arg.page,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isFetching = false;
    });
    builder.addCase(searchLocationByName.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'No locations found';
      state.entities = [];
    });
    builder.addCase(getLocationByPage.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload.location;
      state.pageInfo = {
        count: action.meta.arg,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isFetching = false;
      state.isPageLoading = false;
    });
  }
});

export default locationsSlice.reducer;
