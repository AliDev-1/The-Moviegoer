//All of our TMDB API calls will be made here.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get the different movie genres.
    getMovieGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get the list of movies on TMDb. By defualt, we will return a list of popular movies unless a genreId/page is specified.
    getPopularMovies: builder.query({
      query: ({ genreId, page }) => {
        //Get movies by genre
        if (genreId && typeof genreId === "number") {
          return `discover/movie?with_genres=${genreId}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //Get popular movies by default
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieGenresQuery } = tmdbApi;
