import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetMovieQuery, useGetSimilarMoviesQuery } from "../services/TMDB";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";
import styled from "styled-components";
import genreIcons from "../assets/genres";
import MovieCard from "./MovieCard";
import TrailerModal from "./TrailerModal";


const MovieDetails = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetMovieQuery(id);
  const { data: similarData, error: similarError, isFetching: similarIsFetching } = useGetSimilarMoviesQuery(id);
  const [trailerModal, setTrailerModal] = useState(false);

  if (isFetching) return <div>Loading...</div>;
  if (similarIsFetching) return <div>Loading...</div>;

  const similarMovies = similarData.results;
 
  console.log(data)


  return (
    <>
      {trailerModal ? (<TrailerModal movieData={data} setTrailerModal={setTrailerModal} />) : (
        <>
        <BackdropContainer url={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}>
        <Poster src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.title} />
        <MovieInfo>
          <div>
            <div>
              <h1>
                {data?.title} ({data?.release_date.split("-")[0]})
              </h1>
              <p>{data?.tagline}</p>
            </div>
            <TaglineRating>
              <Rating>
                <ReactStars count={5} value={data?.vote_average / 2} size={22} color2={"#ffd700"} />
                {data?.vote_average}
              </Rating>
              {data?.runtime} min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ""}
            </TaglineRating>
          </div>
          <p>{data?.overview}</p>
          <GenreLink>
            {data.genres.map((genre, i) => {
              return (
                <Link key={genre.name} to="/" onClick={() => {}}>
                  <GenreLink>
                    <GenreIcon src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} />
                    {genre.name}
                  </GenreLink>
                </Link>
              );
            })}
          </GenreLink>
          <CastContainer>
            {data &&
              data.credits.cast
                .map((actor) => {
                  return (
                    actor.profile_path && (
                      <ActorLink to={`/actor/${actor.id}`}>
                      <CastCard key={actor.id}>
                        <CastImage src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                        <p>

                          {actor.name} / {actor.character}
                        </p>
                      </CastCard>
                          </ActorLink>
                    )
                  );
                  })
                .slice(0, 10)}
          </CastContainer>
        </MovieInfo>
      </BackdropContainer>
      <ButtonDiv>
        <Button>Add to Watchlist</Button>
        <Button>Add to Favorites</Button>
        <Button>Movie Website</Button>
        <Button>IMDB Link</Button>
        <Button
          onClick={() => {
            setTrailerModal(true);
          }}
          >
          Watch Trailer
        </Button>
      </ButtonDiv>
      <SimilarMoviesContainer>
        <h3>Similar Movies</h3>
        <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
          {similarMovies &&
            similarMovies.map((movie, i) => {
              return (
                <SimilarMoviesContainer>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </SimilarMoviesContainer>
              );
            })}
        </Slider>
          </SimilarMoviesContainer>
          </>
    )}
    </>
  );
};

const BackdropContainer = styled.div`
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 1) 6%, rgba(121, 91, 9, 1) 31%, rgba(0, 212, 255, 0) 100%), url(${(props) => props.url});
  background-size: cover;
  font-size: 22px;
  color: white;
  height: 800px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
`;

const Poster = styled.img`
  margin-top: 400px;
  height: 550px;
  width: 350px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const MovieInfo = styled.div`
  margin-top: 675px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
`;

const TaglineRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Rating = styled.div`
display: flex;
`
const GenreIcon = styled.img`
  color: ${({ active }) => (active ? "#f1f1f1" : "#818181")};
  font-size: 25px;
  height: 50px;
`;

const GenreLink = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
justify-content: center;
text-decoration: none;
color: white;
`

const CastContainer = styled.div`
  padding: 0px;
  color: white;
  width: 700px;
  font-size: 18px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 30px;
  gap: 20px;
`;
const CastImage = styled.img`
width: 100px;
height: 100px;
object-fit: cover;
border-radius: 50%;
` 
const CastCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const ButtonDiv = styled.div`
margin-top: 200px;
margin-left: 200px;
width: 200px;
display: flex;
flex-direction: column;
gap: 10px;
`
const Button = styled.button`
  background: #b59575;
  border: 1px solid #b59575;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;

  &:hover,
  &:active {
    background-color: initial;
    background-position: 0 0;
    color: #b59575;
  }

  &:active {
    opacity: 0.5;
  }
`;

const ActorLink = styled(Link)`
text-decoration: none;
color: white;
`


const SimilarMoviesContainer = styled.div`
color: white;
`

const TestDiv = styled.div`
width: 300px;
height: 300px;
`

export default MovieDetails;
