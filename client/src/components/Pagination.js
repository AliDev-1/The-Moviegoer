import React from "react";
import styled from "styled-components";

const Pagination = ({currentPage, setPage, totalPages}) => {
    
    const handlePrev = () => {
        if(currentPage !== 1){
            setPage((prevPage) => prevPage - 1);
        }
    };
    const handleNext = () => {
        if(currentPage !== totalPages){
            setPage((prevPage) => prevPage + 1);
        }
    };

  return (
    <>
      <Container>
        <Button onClick={handlePrev}>Prev</Button>
        <CurrentPage>{currentPage}</CurrentPage>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </>
  );
};

const Container = styled.div`
   display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
  margin: 30px 2px;
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
    color: #fec11b;
  }

  &:active {
    opacity: 0.5;
  }
`;

const CurrentPage = styled.h4`
  margin: 0 20px;
  color: #fec11b;
`;
export default Pagination;
