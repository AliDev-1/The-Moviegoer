import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Importing fetching and selectGenre functionalities using Redux Toolkit
import { useSelector } from "react-redux";
import { selectGenre } from "../features/currentGenre";
import { useGetMoviesQuery } from "../services/TMDB";

import styled from "styled-components";

//* Importing endpoint request from the /services/TMDB.js file

import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreId, searchQuery } = useSelector((state) => state.currentGenre);
  const { data, error, isFetching } = useGetMoviesQuery({ genreId, page, searchQuery });

  if (isFetching) return <div>Loading...</div>;
  const movieData = data.results;

  return (
    <PageContainer initial={{ opacity: 0, transition: { duration: 2 } }} animate={{ opacity: 1, transition: { duration: 2 } }} exit={{ opacity: 0, transition: { duration: 2 } }}>
      <Title>Movies</Title>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
      <Container>
        <MoviesContainer>
          {movieData.map((movie, i) => {
            return <MovieCard key={i} movie={movie} i={i} />;
            <Link to={`/movie/${movie.id}`}></Link>;
          })}
        </MoviesContainer>
        <PaginationContainer>
          <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
        </PaginationContainer>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled(motion.div)`
  margin: 20px;
  padding: 20px;
  border: 1px solid #fec11b;
  border-radius: 10px;
`;

const Title = styled.h3`
  color: #fec11b;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Movies;
