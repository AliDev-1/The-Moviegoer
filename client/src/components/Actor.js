import React, { useState } from 'react'
import { useHiistory, useParams, Link } from 'react-router-dom'
import moment from "moment";
import styled from 'styled-components'
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../services/TMDB'
import {motion} from "framer-motion"
import Loading from './Loading';
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Actor = () => {
  const { id } = useParams()
  const page = 1
  const { data, error, isFetching } = useGetActorDetailsQuery(id)
  
  if (isFetching) return <Loading />

  return (
    <Container initial={{ opacity: 0, transition: { duration: 2 } }} animate={{ opacity: 1, transition: { duration: 2 } }} exit={{ opacity: 0, transition: { duration: 2 } }}>
      <SubContainer>
        <ProfileContainer>
          <div>
            <ProfileImage src={`https://image.tmdb.org/t/p/original${data.profile_path}`} alt={data.name} />
          </div>
          <Profile>
            <ProfileName>{data.name}</ProfileName>
            <ProfileSubheader>
              <ProfileDate>Born : {moment(data.birthday).format("MMMM Do YYYY")} </ProfileDate>
              <ProfileBirthplace>Place of Birth : {data.place_of_birth}</ProfileBirthplace>
            </ProfileSubheader>
            <ProfileBio>{data.biography}</ProfileBio>
            <Button to={`https://www.imdb.com/name/${data.imdb_id}`}>IMDB Link</Button>
          </Profile>
        </ProfileContainer>
      </SubContainer>
      <ActorImagesContainer>
        <h3>Images</h3>
        <Slider dots={false} infinite={true} slidesToShow={6} slidesToScroll={1} autoplay={true} speed={2000} autoplaySpeed={2000} cssEase={"linear"}>
          {data &&
            data.images.profiles.map((image, i) => {
              return (
                <div>
                  <ActorImage src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={data.name} />
                </div>
              );
            })}
        </Slider>
      </ActorImagesContainer>
      <ActorMoviesContainer>
        <h3>Actor's Filmography</h3>
        <Slider dots={false} infinite={true} slidesToShow={4} slidesToScroll={1} autoplay={true} speed={2000} autoplaySpeed={2000} cssEase={"linear"}>
          {data &&
            data.credits.cast.map((movie, i) => {
              return (
                <div>
                  <MovieCard key={i} movie={movie} i={i} />
                  <Link to={`/movie/${movie.id}`}></Link>
                </div>
              );
            })}
        </Slider>
      </ActorMoviesContainer>
    </Container>
  );
}

const Container = styled(motion.div)`
display: flex;
flex-direction: column;
`

const SubContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const ProfileContainer = styled.div`
margin-top: 50px;
display: flex;
justify-content: center;
align-items: center;
color: white;
width: 1200px;
gap: 50px;
`
const Profile = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fec11b;
  background-color: #202125; 
  border-radius: 30px; 
`
const ProfileName = styled.h2`
border-bottom: 1px solid #fec11b;
`
const ProfileSubheader = styled.div`
display: flex;
gap: 60px;
`

const ProfileDate = styled.h5`
margin: 0px;
`
const ProfileBirthplace = styled.h5`
margin: 0px;
`

const ProfileBio = styled.p`
text-align: justify;
font-size: 24px;
`
const ProfileImage = styled.img`
  margin-top: 50px;
  height: 550px;
  width: 350px;
  border-radius: 30px;
  box-shadow: rgba(254,193,27, 0.4) -5px 5px, rgba(254,193,27, 0.3) -10px 10px, rgba(254,193,27, 0.2) -15px 15px, rgba(254,193,27, 0.1) -20px 20px, rgba(254,193,27, 0.05) -25px 25px;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
const Button = styled(Link)`
  text-decoration: none;
  background: #fec11b;
  border: 1px solid #fec11b;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 18px;
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
`
const ActorMoviesContainer = styled.div`
  margin: 10px 70px;
  padding: 20px;
  color: #fec11b;
  align-items: center;
  justify-content: center;
  border: 1px solid #fec11b;
  background-color: #202125;
  border-radius: 30px;
`;

const ActorImagesContainer = styled.div`
  margin: 70px;
  padding: 20px;
  color: #fec11b;
  align-items: center;
  justify-content: center;
  border: 1px solid #fec11b;
  border-radius: 30px;
  background-color: #202125;
`;

const ActorImage = styled.img`
  height: 300px;
  width: 200px;
  border-radius: 30px;
  box-shadow: rgba(254,193,27, 1) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
`;
;  
 


export default Actor