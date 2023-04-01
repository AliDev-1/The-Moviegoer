//Configuring Redux Toolkit store as per the documentation

import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "../services/TMDB";

//Importing the currentGenre slice of the store
import currentGenreReducer from "../features/currentGenre";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenre: currentGenreReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
