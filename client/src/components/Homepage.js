import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Importing fetching and selectGenre functionalities using Redux Toolkit
import { useSelector } from "react-redux";
import { selectGenre } from "../features/currentGenre";
import { useGetPopularMoviesQuery } from "../services/TMDB";

import styled from "styled-components";

//* Importing endpoint request from the /services/TMDB.js file

import MovieCard from "./MovieCard";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const { genreId, searchQuery } = useSelector((state) => state.currentGenre);
  const { data, error, isFetching } = useGetPopularMoviesQuery({ genreId, page, searchQuery });

  if (isFetching) return <div>Loading...</div>;
  const movieData = data.results;

  return (
    <>
      <div>Homepage</div>
      <div>
        <h3>Popular Movies</h3>
        <Conatiner>
          {movieData.map((movie, i) => {
            return <MovieCard key={i} movie={movie} i={i} />;
            <Link to={`/movie/${movie.id}`}></Link>;
          })}
        </Conatiner>
      </div>
    </>
  );
};

const Conatiner = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

export default Homepage;
