import React from "react";
import styled from "styled-components";
import {motion} from 'framer-motion'
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import Loading from "./Loading";
import moment from "moment";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);



  const handleFetchWatchlist = () => { 
    fetch(`/watchlist/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWatchlist(data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFetchFavorites = () => { 
    fetch(`/favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFavorites(data.data);
      })
      .catch((err) => console.log(err));
  };

  // Fetch Watchlist and Favorites on page load
  useEffect(() => {
    if (user) {
      handleFetchWatchlist()
      handleFetchFavorites()
      setLoading(false);
    }
  }, [user,]);

  

  //Remove from Watchlist Function

  const handleRemoveFromWatchlist = (id) => { 
    console.log(id)
    fetch("/remove-from-watchlist", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, movieId: id }), //Sending user email and item Id in the body
    })
      .then((response) => {
        console.log(response); //setWatchlist filter the array of watchlist and return all the items that are not equal to the id
        handleFetchWatchlist()
      })
      .catch((error) => {
      console.error("error", error);
      });
  };

  const handleRemoveFromFavorites = (id) => {
    console.log(id);
    fetch("/remove-from-favorites", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, movieId: id }), //Sending user email and item Id in the body
    })
      .then((response) => {
        console.log(response); //setWatchlist filter the array of watchlist and return all the items that are not equal to the id
        handleFetchFavorites();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  
  if (loading) return <Loading />;
 

  if (user) {
    return (
      <Container initial={{ opacity: 0, transition: { duration: 2.5 } }} animate={{ opacity: 1, transition: { duration: 2.5 } }} exit={{ opacity: 0, transition: { duration: 2.5 } }}>
        <UserDiv>
          <ProfilePicture src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <h4>Account: {user.email}</h4>
          <p>Last Seen: {moment(user.updated_at).format("dddd, MMMM Do YYYY, h:mm a")} </p>
        </UserDiv>
        <WatchlistContainer>
          <h3>My Watchlist</h3>
          <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
            {watchlist &&
              watchlist.map((movie, i) => {
                console.log(movie);
                return (
                  <MovieListContainer>
                    <MovieCard key={i} movie={movie} i={i} />
                    <Link to={`/movie/${movie.id}`}></Link>
                    <Button onClick={() => handleRemoveFromWatchlist(movie.id)}>Watched</Button>
                  </MovieListContainer>
                );
              })}
          </Slider>
        </WatchlistContainer>
        <WatchlistContainer>
          <h3>My Favorites</h3>
          <Slider dots={false} slidesToShow={4} autoplay={true} autoplaySpeed={2000}>
            {favorites &&
              favorites.map((movie, i) => {
                console.log(movie);
                return (
                  <MovieListContainer>
                    <MovieCard key={i} movie={movie} i={i} />
                    <Link to={`/movie/${movie.id}`}></Link>
                    <Button onClick={() => handleRemoveFromFavorites(movie.id)}>I hate it now</Button>
                  </MovieListContainer>
                );
              })}
          </Slider>
        </WatchlistContainer>
      </Container>
    );
  }
};

const Container = styled(motion.div)`
  margin-top: 100px;
  color: white;
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fec11b;
  font-size: 25px;
  border: 1px solid #fec11b;
  padding: 30px;
  margin: 0px 500px;
  background: #202125;
`;
const ProfilePicture = styled.img`
  height: 250px;
  width: 250px;
  border: 10px solid #fec11b;
  border-radius: 50%;
`;

const WatchlistContainer = styled.div`
  margin: 70px;
  color: #fec11b;
`;

const Button = styled.button`
  margin: 30px 110px;
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
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column
  align-items: center;
  justify-content: center;
  `;
export default Profile;
