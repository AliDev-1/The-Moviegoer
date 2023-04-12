import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {searchMovie} from "../features/currentGenre"
import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          dispatch(searchMovie(query))
          navigate("/movies")
      }
  };

  return (
    <SearchBarWrapper>
      <SearchIcon />
      <SearchInput type="text" placeholder="Search" onKeyPress={handleKeyPress} onChange={(e) => setQuery(e.target.value)} value={query} />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: white;
  border-radius: 5px;
  padding: 0 10px;
  height: 36px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(RiSearchLine)`
  font-size: 20px;
  color: white;
`;

export default SearchBar;
