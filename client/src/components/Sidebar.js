//Importing the different components and styling
import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineLogin, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { MdOutlineLocalMovies } from "react-icons/md";
import { useGetMovieGenresQuery } from "../services/TMDB";
import genreIcons from "../assets/genres"

import { useDispatch, useSelector } from "react-redux";
import { selectGenre } from "../features/currentGenre";

const Sidebar = ({ mini }) => {
  const { data, error, isFetching } = useGetMovieGenresQuery(); //We need to use the useGetMovieGenresQuery hook to get the different genres
  const dispatch = useDispatch(); //We need to use the dispatch function from Redux Toolkit to send the genre id to the Redux store
  const {genreId} = useSelector((state) => state.currentGenre); //We use the useSelector hook to store the valueID of the current genre in the Redux store upon clicking 
  
  console.log(genreId);
  
  return (
    <>
      <Container1 id="mySidebar">
        <SidebarLink active={mini}>
          <AiOutlineLogin />
          <IconText active={mini}>Login</IconText>
        </SidebarLink>
        <SidebarLink active={mini}>
          <FaThList />
          <IconText active={mini}>Watchlist</IconText>
        </SidebarLink>
        <SidebarLink active={mini}>
          <AiOutlineHeart />
          <IconText active={mini}>Favorites</IconText>
        </SidebarLink>
        <SidebarLink active={mini}>
          <AiOutlineMail />
          <IconText active={mini}>Contact</IconText>
        </SidebarLink>
      </Container1>
      <SidebarLink active={mini}>
        <MdOutlineLocalMovies />
        <SidebarTitle active={mini}>Categories</SidebarTitle>
      </SidebarLink>
      {isFetching ? ( // If the data is still loading, show a loading message
        <div>Loading...</div>
      ) : (
        data.genres.map(({name, id}) => { //Show the different genres in the sidebar
          return (
            <SidebarLink active={mini} key={id} onClick= {()=>dispatch(selectGenre(id))}>
              <GenreIcon src={genreIcons[name.toLowerCase()]} alt={name} /> 
              <IconText active={mini}>{name}</IconText>
            </SidebarLink>
          );
        })
      )}
    </>
  );
};


const Container1 = styled.nav`
  border-bottom: 2px solid #f1f1f1;
`;

const SidebarTitle = styled.span`
  display: ${({ active }) => (active ? "none" : "block")};
  margin-left: 10px;
`;

const SidebarLink = styled.a`
  padding: 8px 8px 8px 20px;
  text-decoration: none;
  font-size: 25px;
  color: ${({ active }) => (active ? "#f1f1f1" : "#818181")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  &:hover {
    color: #f1f1f1;
  }
`;

const IconText = styled.span`
  margin-left: 10px;
  display: ${({ active }) => (active ? "none" : "block")};
  cursor: pointer;
`;

const GenreIcon = styled.img`
  color: ${({ active }) => (active ? "#f1f1f1" : "#818181")};
  font-size: 25px;
  height: 50px;
`;

const Main = styled.div`
  padding: 16px;
  margin-left: 85px;
  transition: margin-left 0.5s;
`;

export default Sidebar;
