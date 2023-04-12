# The-Moviegoer

Final project for CB-WD-23

A movie databse website built in ReactJS with ReduxToolkit and the TMDB API. For the first iteration,
the backend is handled by NodeJS while storing our data using the Atlas service by MongoDB.

Required API KEYS

In the client directory (/client)

//From TMDB
REACT_APP_TMDB_KEY

//From Auth0
REACT_APP_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID

In the client directory (/server)
//From MongoDB
MONGO_URI

To start the site, install the required dependicies both in the client and server

```
cd client
yarn install
```

```
cd server
yarn install
```

To run the application

```
cd client
yarn start
```

Start the server

```
cd server
yarn start
```

Navigate to http://localhost:3000/ to view the website.
