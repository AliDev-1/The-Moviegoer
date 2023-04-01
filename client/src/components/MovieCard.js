import React from "react";
import "./MovieCard.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <>
      <Card url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card">
        <div className="card-content">
          <h2 className="card-title">{movie.original_title}</h2>
          <p className="card-body"> {movie.overview}</p>
          <a href="#" className="button">
            {" "}
            Go to movie{" "}
          </a>
        </div>
      </Card>
    </>
  );
};

const Card = styled.div`
  margin: 10px;;
  color: hsl(0, 0%, 100%);
  background-size: cover;
  background-image: url(${(props) => props.url});
  padding: 20rem 0 0 0;
  max-width: 500px;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.5s ease;
  outline: 1px solid red;

  &:hover {
    transform: scale(1.05);
  }
`;

// const CardContent = styled.div`
//   --padding: 1.5rem;
//   padding: var(--padding);
//   background: linear-gradient(hsl(0 0% 0% / 0), hsl(20 0% 0% / 0.3), 20%, hsl(0 0% 0% / 1));
//   transform: translateY(60%);
//   transition: transform 0.5s ease;

//   ${Card}:hover & {
//     transform: translateY(0);
//     transition-delay: 0.5s;
//   }

//   > *:not(.card-title) {
//     opacity: 0;
//     transition: opacity 0.5s linear;
//   }

//   ${Card}:hover > *:not(.card-title) {
//     opacity: 1;
//     transition-delay: 0.5s;
//   }
// `;

// const CardTitle = styled.h2`
//   position: relative;
//   width: max-content;

//   &::after {
//     content: "";
//     position: absolute;
//     height: 4px;
//     left: calc(var(--padding) * -1);
//     bottom: -2px;
//     width: calc(100% + var(--padding));
//     background: hsl(207, 90%, 54%);
//     transform: scaleX(0);
//     transform-origin: left;
//     transition: transform 0.5s ease;
//   }

//   ${Card}:hover &::after {
//     transform: scaleX(1);
//   }
// `;

// const CardBody = styled.p`
//   margin-top: 10px;
//   color: rgb(255 255 255 /0.85);
// `;

// const Button = styled.a`
//   margin-top: 10px;
//   cursor: pointer;
//   display: inline-block;
//   text-decoration: none;
//   color: hsl(207, 19%, 9%);
//   background: hsl(207, 90%, 54%);
//   padding: 0.5em 1.25em;
//   border-radius: 1rem;

//   &:hover,
//   &:focus {
//     background: hsl(0, 0%, 100%);
//   }
// `;

export default MovieCard;
