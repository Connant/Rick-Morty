import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import locationsSlice from "@features/locations/model/locationsSlice.ts";
import charactersSlice from "@features/characters/model/charactersSlice.ts";
import episodesSlice from "@features/episodes/model/episodesSlice.ts";

export const store = configureStore({
  reducer: {
    locations: locationsSlice,
    characters: charactersSlice,
    episodes: episodesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;