//Importing the different components and styling
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineLogin, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { MdOutlineLocalMovies } from "react-icons/md";
import { useGetMovieGenresQuery } from "../services/TMDB";
import genreIcons from "../assets/genres"
import moviegoerAvatar from "../assets/images/moviegoerAvatar.png";

import { useDispatch, useSelector } from "react-redux";
import { selectGenre } from "../features/currentGenre";

const Sidebar = ({ mini }) => {
  const { data, error, isFetching } = useGetMovieGenresQuery(); //We need to use the useGetMovieGenresQuery hook to get the different genres
  const dispatch = useDispatch(); //We need to use the dispatch function from Redux Toolkit to send the genre id to the Redux store
  const {genreId} = useSelector((state) => state.currentGenre); //We use the useSelector hook to store the valueID of the current genre in the Redux store upon clicking 
  
  const navigate = useNavigate();

  
  console.log(genreId);
  
  return (
    <Container>
      <SidebarLink to='/' active={mini}>
        <Logo src={moviegoerAvatar} alt="Moviegoer Avatar" />
        {/* <SidebarTitle active={mini}>Categories</SidebarTitle> */}
      </SidebarLink>
      {isFetching ? ( // If the data is still loading, show a loading message
        <div>Loading...</div>
      ) : (
        data.genres.map(({name, id}) => { //Show the different genres in the sidebar
          return (
            <SidebarLink to="/movies" active={mini} key={id} onClick={() => dispatch(selectGenre(id))}>
              <GenreIcon src={genreIcons[name.toLowerCase()]} alt={name} />
              <IconText active={mini}>{name}</IconText>
            </SidebarLink>
          );
        })
      )}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
`;

const SidebarTitle = styled.span`
  display: ${({ active }) => (active ? "none" : "block")};
  margin-left: 10px;
`;

const SidebarLink = styled(Link)`
  padding: 8px 8px 8px 20px;
  text-decoration: none;
  font-size: 25px;
  color: ${({ active }) => (active ? "#fec11b" : "#818181")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  &:hover {
    color: #fec11b;
  }
`;

const IconText = styled.span`
  margin-left: 10px;
  display: ${({ active }) => (active ? "none" : "block")};
  cursor: pointer;
`;

const GenreIcon = styled.img`
  color: ${({ active }) => (active ? "#fec11b" : "#818181")};
  font-size: 25px;
  height: 50px;
`;

const Main = styled.div`
  padding: 16px;
  margin-left: 85px;
  transition: margin-left 0.5s;
`;

const Logo = styled.img`
  height: 80px;
`;
export default Sidebar;
