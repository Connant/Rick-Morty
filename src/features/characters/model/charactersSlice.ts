import { createSlice } from '@reduxjs/toolkit';
import {initialState} from "./charactersState.ts";
import {getCharacters, getCharactersByPage, searchCharactersByName} from "./charactersThunks.ts";

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.loading = 'pending';
      state.isFetching = true;
      state.isPageLoading = true;
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = [...state.entities, ...action.payload.characters];
      state.pageInfo = {
        count: action.meta.arg,
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isFetching = false;
      state.isPageLoading = false;
    });
    builder.addCase(getCharacters.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
      state.isFetching = false;
      state.isPageLoading = false;
    });
    builder.addCase(searchCharactersByName.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      // Обновляем список персонажей результатами поиска, заменяя предыдущие данные
      state.entities = action.payload.characters;
      state.pageInfo = {
        count: action.meta.arg.page, // Обновляем текущую страницу
        pages: action.payload.pageInfo.pages,
        next: action.payload.pageInfo.next,
        prev: action.payload.pageInfo.prev,
      };
      state.isFetching = false;
    });
    builder.addCase(getCharactersByPage.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload.characters; // Замена списка
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

export default charactersSlice.reducer;
