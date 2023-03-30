import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineLogin, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import {FaThList} from "react-icons/fa"

const Sidebar = ({ mini, }) => {
  return (
    <>
          <nav id="mySidebar">
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
      </nav>
    </>
  );
};



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
`;

const Main = styled.div`
  padding: 16px;
  margin-left: 85px;
  transition: margin-left 0.5s;
`;

export default Sidebar;
