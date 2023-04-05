//All of our TMDB API calls will be made here...
//We are using Redux Toolkit Query to make our API calls
//Syntax taken from Redux documentation

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get the different movie genres.
    getMovieGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get the list of movies on TMDb for MovieList component. By defualt, we will return a list of popular movies unless a searchQuery or genreId/page is specified.
    getPopularMovies: builder.query({
      query: ({ genreId, page, searchQuery }) => {
        //Get movies by search query
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //Get movies by genre
        if (genreId && typeof genreId === "number") {
          return `discover/movie?with_genres=${genreId}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //Get popular movies by default
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    //Get single movie by ID
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //Get simmilar movie by ID
    getSimilarMovies: builder.query({
      query: (id) => `/movie/${id}/similar?api_key=${tmdbApiKey}`,
    }),

    //Get actor details by ID
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}&append_to_response=images,credits`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieGenresQuery, useGetMovieQuery, useGetSimilarMoviesQuery, useGetActorDetailsQuery } = tmdbApi;
