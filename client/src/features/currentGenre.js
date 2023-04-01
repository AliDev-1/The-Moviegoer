//We are using the redux toolkit to create a slice of the store that will hold the current genre selected by the user
//Syntax taken from Redux Toolkit documentation

import { createSlice } from "@reduxjs/toolkit";

export const currentGenreSlice = createSlice({
  name: "currentGenre",
  initialState: {
    genreId: "",
    page: 1,
    serachQuery: "",
  },
  reducers: {
    selectGenre: (state, action) => {
      state.genreId = action.payload; //The action.payload will give us a genreID number from the sidebar component upon clicking on a genre
      
    },
  },
});

export const { selectGenre } = currentGenreSlice.actions;

export default currentGenreSlice.reducer;
