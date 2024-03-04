import { createSlice } from '@reduxjs/toolkit';
import {initialState} from "./episodesState.ts";
import {getEpisodes, getEpisodesByPage, searchEpisodesByName} from "@features/episodes/model/episodesThunks.ts";

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.pending, (state) => {
      state.loading = 'pending';
      state.isPageLoading = true;
    });
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = [...state.entities, ...action.payload.episodes];
      state.pageInfo = {
        count: action.meta.arg,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isPageLoading = false;
    });
    builder.addCase(getEpisodes.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
      state.isPageLoading = false;
    });
    builder.addCase(searchEpisodesByName.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.error = null;
      state.entities = action.payload.episodes;
      state.pageInfo = {
        count: action.meta.arg.page,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
    });
    builder.addCase(searchEpisodesByName.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'No episodes found';
      state.entities = [];
    });
    builder.addCase(getEpisodesByPage.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload.episodes;
      state.pageInfo = {
        count: action.meta.arg,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isPageLoading = false;
    });
  }
});

export default episodesSlice.reducer;
