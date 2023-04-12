import React from "react";
import { Link } from "react-router-dom";
import { useGetPopularMoviesQuery, useGetNowPlayingMoviesQuery, useGetUpcomingMoviesQuery, useGetTopRatedMoviesQuery, useGetTrendingMoviesQuery } from "../services/TMDB";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Loading from "./Loading";
import MovieCard from "./MovieCard";
import homepageBackground from "../assets/images/homepageBackground.jpg";
import MoviegoerLogo from "../assets/images/MovieGoerLogo.png";

const Homepage = () => {
  const { data, error, isFetching } = useGetUpcomingMoviesQuery();
  const { data: nowPlayingData, error: nowPlayingError, isFetching: nowPlayingIsFetching } = useGetNowPlayingMoviesQuery();
  const { data: topRatedData, error: topRatedError, isFetching: topRatedIsFetching } = useGetTopRatedMoviesQuery();
  const { data: trendingData, error: trendingError, isFetching: trendingIsFetching } = useGetTrendingMoviesQuery();

  if (isFetching) return <Loading />;
  if (nowPlayingIsFetching) return <Loading />;
  if (topRatedIsFetching) return <Loading />;
  if (trendingIsFetching) return <Loading />;

  const upcomingMovies = data.results;
  const nowPlayingMovies = nowPlayingData.results;
  const topRatedMovies = topRatedData.results;
  const trendingMovies = trendingData.results;

  console.log(trendingData);

  return (
    <Container initial={{ opacity: 0, transition: { duration: 3 } }} animate={{ opacity: 1, transition: { duration: 3 } }} exit={{ opacity: 0, transition: { duration: 3 } }}>
      <BackdropContainer>
        <Logo src={MoviegoerLogo} alt="Moviegoer Logo" />
      </BackdropContainer>
      <MovieSliderContainer>
        <h3>Now Playing in Theatres</h3>
        <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
          {nowPlayingMovies &&
            nowPlayingMovies.map((movie, i) => {
              return (
                <div>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </div>
              );
            })}
        </Slider>
      </MovieSliderContainer>
      <MovieSliderContainer>
        <h3>Upcoming Movies</h3>
        <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
          {upcomingMovies &&
            upcomingMovies.map((movie, i) => {
              return (
                <div>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </div>
              );
            })}
        </Slider>
      </MovieSliderContainer>
      <MovieSliderContainer>
        <h3>Trending Movies Of The Day</h3>
        <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
          {trendingMovies &&
            trendingMovies.map((movie, i) => {
              return (
                <div>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </div>
              );
            })}
        </Slider>
      </MovieSliderContainer>
      <MovieSliderContainer>
        <h3>Top Rated Movies</h3>
        <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
          {topRatedMovies &&
            topRatedMovies.map((movie, i) => {
              return (
                <div>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </div>
              );
            })}
        </Slider>
      </MovieSliderContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
`

const MovieSliderContainer = styled.div`
  margin: 40px 70px;
  padding: 20px;
  border-bottom: 1px solid #fec11b;
  color: #fec11b;
`;

const BackdropContainer = styled.div`
  background-image: url(${homepageBackground});
  margin: 20px 0px;
  border: 1px solid #fec11b;
  background-size: cover;
  font-size: 22px;
  color: #fec11b;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Logo = styled.img`
  margin-left: 50px;
  height: 750px;
  width: 1300px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Homepage;
