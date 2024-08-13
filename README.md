# The Moviegoer

![The Moviegoer Logo](/client/src/assets/images/MovieGoerLogo.png) 

## Overview

**The Moviegoer** is a movie database website built as a final project for Concordia University's web development program with ReactJS, using StyledComponents for styling and ReduxToolkit for managing API calls to The Movie Database (TMDB) API. The backend is powered by NodeJS and MongoDB Atlas, allowing users to store their watchlists and favorite movies. 

This project is being actively developped.

## Features

- Browse and search for movies using TMDB API.
- Manage a personalized watchlist and favorite movies.
- Authentication handled via Auth0.
- Data persistence using MongoDB Atlas.

## Project Structure

- **Client:** Built with React, ReduxToolkit, and StyledComponents.
- **Server:** NodeJS backend, connected to MongoDB Atlas.

## Prerequisites

To run the project locally, ensure you have the following:

- Node.js installed
- Yarn package manager installed
- TMDB API key
- Auth0 credentials
- MongoDB URI

## API Keys and Environment Variables

In the client directory (`/client`), create a `.env` file with the following:

```env
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id

In the server directory (`/server`), create a `.env` file with the following:

MONGO_URI=your_mongodb_uri


1. Clone the repository 

git clone https://github.com/yourusername/the-moviegoer.git
cd the-moviegoer

2. Install client dependecies 
cd client
yarn install

3. Install server dependecies 
cd server
yarn install

4. Start the client
cd client
yarn start

5.Start the server
cd server
yarn start

Access the website at : http://localhost:3000/ 