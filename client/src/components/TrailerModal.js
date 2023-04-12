import React from "react";
import styled from "styled-components";

const TrailerModal = ({ movieData, setTrailerModal }) => {
  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <CloseButton
            onClick={() => {
              setTrailerModal(false);
            }}
          >
            X
          </CloseButton>
          <ModalTitle>
            {movieData.title}
            <h3>Enjoy your Trailer</h3>
          </ModalTitle>
          <ModalBody>
            {movieData.videos.results.length > 0 && (
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setTrailerModal(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  position: absolute;
  justify-content: center;
margin-top: 200px;
`;

const ModalContainer = styled.div`
  color: white; 
  border: 1px solid #fec11b;
  width: 700px;
  height: 650px;
  border-radius: 12px;
  box-shadow: rgba(254, 193, 27, 0.4) 0px 5px, rgba(254, 193, 27, 0.3) 0px 10px, rgba(254, 193, 27, 0.2) 0px 15px, rgba(254, 193, 27, 0.1) 0px 20px, rgba(254, 193, 27, 0.05) 0px 25px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: #202125;
`;

const ModalTitle = styled.div`
  display: inline-block;
  text-align: center;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #fec11b;
  cursor: pointer;
`;

const ModalBody = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalFooter = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: #fec11b;
  border: 1px solid #b59575;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: black;
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

export default TrailerModal;
