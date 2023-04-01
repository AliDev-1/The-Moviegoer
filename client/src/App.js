import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Homepage from "./components/Homepage";
import MovieDetails from "./components/MovieDetails";
import Actors from "./components/Actors";
import Profile from "./components/Profile";
import GlobalStyles from "./components/GlobalStyles";

const App = () => {
  //See if mouse is hovering over sidebar to expand icons
  //We want to use state to keep track of whether the sidebar is expanded or not and send it to the sidebar component
  const [mini, setMini] = useState(true);
  const toggleSidebar = () => {
    setMini(!mini);
  };

  return (
    <Router>
      <GlobalStyles />
      <SidebarDiv
        onMouseEnter={() => {
          setMini(false);
        }}
        onMouseLeave={() => {
          setMini(true);
        }}
      >
        <Sidebar mini={mini} toggleSidebar={toggleSidebar} />
      </SidebarDiv>
      <Main>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Main>
    </Router>
  );
};

const SidebarDiv = styled.div`
  height: 100%;
  width: 65px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #1e1c3d;
  transition: 0.5s;
  overflow-x: hidden;
  padding-top: 60px;
  white-space: nowrap;

  &:hover {
    width: 250px;
  }

  &:hover ~ #main {
    margin-left: 250px;
  }
`;

const Main = styled.div`
  padding: 16px;
  margin-left: 65px;
  transition: margin-left 0.5s;
  font-size: 30px;
`;

export default App;
