//We are using Redux Toolkit Query to make our API calls
//All of our TMDB API calls will be made here...
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
    getMovies: builder.query({
      query: ({ genreId, page=1, searchQuery }) => {

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
      query: (id) => `/movie/${id}?append_to_response=videos,credits,images,reviews&api_key=${tmdbApiKey}`,
    }),

    //Get simmilar movie by ID
    getSimilarMovies: builder.query({
      query: (id) => `/movie/${id}/similar?api_key=${tmdbApiKey}`,
    }),

    //Get actor details by ID
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}&append_to_response=images,credits`,
    }),

    //Get actor credits by ID
    getMoviesByActorId: builder.query({
      query: (id, page=1) => `person/${id}/movie_credits?api_key=${tmdbApiKey}&page=${page}`,
    }),

    //Get popular movies
    getPopularMovies: builder.query({
      query: (page=1) => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //Get now playing movies
    getNowPlayingMovies: builder.query({
      query: (page=1) => `movie/now_playing?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //Get trending movies of the day
    getTrendingMovies: builder.query({
      query: () => `trending/movie/day?api_key=${tmdbApiKey}`,
    }),

    //Get upcoming movies
    getUpcomingMovies: builder.query({
      query: (page=1) => `movie/upcoming?page=${page}&api_key=${tmdbApiKey}`,
    }),

    //Get top rated movies
    getTopRatedMovies: builder.query({
      query: (page=1) => `movie/top_rated?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieGenresQuery, useGetMovieQuery, useGetSimilarMoviesQuery, useGetActorDetailsQuery, useGetMoviesByActorIdQuery, useGetPopularMoviesQuery, useGetNowPlayingMoviesQuery, useGetTrendingMoviesQuery, useGetUpcomingMoviesQuery, useGetTopRatedMoviesQuery } = tmdbApi;
