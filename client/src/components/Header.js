import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserButton from "./UserButton";
import SearchBar from "./SearchBar";
import cinema from "../assets/images/cinema.png";


// Header Banner of Site
const Header = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [scrollPosition, setScrollPosition] = useState("100px");

  // Styling for NavLink Here
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#B59575",
    fontWeight: "bold",
    fontSize: scrollPosition >= 50 ? ".9rem" : "1.4rem",
    padding: "0 10px",
  };

  const inactiveStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "lightgrey",
    fontSize: scrollPosition >= 50 ? ".9rem" : "1.4rem",
    fontWeight: "normal",
    padding: "0 10px",
  };

  // Scroll Event
  useEffect(() => {
    const handleShrinkScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleShrinkScroll);
    return () => {
      window.removeEventListener("scroll", handleShrinkScroll);
    };
  }, []);

  return (
    <>
      <Wrapper scrollPosition={scrollPosition}>
        <StyledLink to="/">
         
        </StyledLink>
        <Div>
          <LinkContainer>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
              Home
            </NavLink>

            <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
              All Movies
            </NavLink>
            <SearchBar />
          </LinkContainer>

          <RightDiv>
            {user && (
              <>
                <NavLink to="/watchlist" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
                  Watchlist
                </NavLink>

                <NavLink to="/favorites" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
                  Favorites
                </NavLink>
              </>
            )}
            <NavLink>
              <UserButton />
            </NavLink>
            {user && <UserProfile src={user.picture} />}
          </RightDiv>
        </Div>
      </Wrapper>
    </>
  );
};

// background: ${(props) =>
// props.scrollPosition >= 50 ? "black" : "#202125"};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #202125;
  border-bottom: 2px solid #b59575;
  position: sticky;
  top: 0;
  z-index: 0;
  height: ${(props) => (props.scrollPosition >= 50 ? "40px" : "80px")};

  transition: height 0.2s ease-in-out;
`;

const Dropdown = styled.div`
  position: relative;
  border-bottom: 5px;
  &:hover ul {
    display: block;
  }
`;
const Ul = styled.ul`
  position: absolute;
  display: none;
  top: 23px;
  right: -5px;
  border: 2px solid black;
`;

const Li = styled.li`
  display: flex;
  position: relative;
  list-style: none;
  background: white;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: #b59575;
    color: white;
  }
`;

const DropLink = styled(Link)`
  flex: 1;
  padding: 5px 10px;
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const Title = styled.img`
  margin-bottom: -10px;
  height: ${(props) => (props.scrollPosition >= 50 ? "90px" : "170px")};
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-left: -20px;
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;
const StyledLink = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: white;
`;

const Cart = styled.div`
  position: relative;
  padding: 0 15px;
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b59575;
  border-radius: 50%;
  color: white;
  width: 15px;
  height: 15px;
  font-size: 0.75rem;
`;

const CartCount = styled.p`
  padding: 0;
  margin: 0;
`;

const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid white;
`;

export default Header;
