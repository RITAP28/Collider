# Movie Recommendation System

A fully-responsive full-stack web application that provides personalized movie recommendations to users based on their preferences and viewing history.

## Table of Contents

- [Movie Recommendation System](#movie-recommendation-system)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [External APIs](#external-apis)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Install frontend dependencies](#install-frontend-dependencies)
- [Install backend dependencies](#install-backend-dependencies)
- [Install database dependencies](#install-database-dependencies)
    - [Environment Variables](#environment-variables)
  - [API Documentation](#api-documentation)
    - [Authentication Endpoints](#authentication-endpoints)
    - [Movie Endpoints](#movie-endpoints)
    - [User Endpoints](#user-endpoints)
  - [Database Schema](#database-schema)
    - [User Model](#user-model)
    - [and more in db/prisma/schema.prisma file](#and-more-in-dbprismaschemaprisma-file)
    - [link to the explanation video:](#link-to-the-explanation-video)
  - [Future Improvements](#future-improvements)
  - [Contributing](#contributing)
  - [License](#license)

### link to the explanation video: 
- [https://drive.google.com/drive/folders/1JOf1LlHos9OxYdEaquU3Vj376NxAPSm6?usp=drive_link]

## Overview

This project was developed as part of an internship assignment. It's a movie recommendation system that allows users to:

- Browse movies by genres, trending, and upcoming releases
- View detailed information about movies, actors, and crew members
- Create and manage watchlists and favorites
- Get personalized movie recommendations
- Write and read movie reviews

## Features

- **User Authentication**
  - Register/Login functionality
  - JWT-based authentication
  - Protected routes

- **Movie Management**
  - Browse movies in the search bar by titles
  - Search functionality
  - Detailed movie information
  - Cast and crew details

- **User Features**
  - Watchlist management
  - Favorites collection
  - Bookmarking system
  - User reviews and ratings

- **Recommendation System**
  - Genre-based recommendations
  - Trending movies section
  - Upcoming and Top-Rated movies section

## Tech Stack

### Frontend

- React.JS with TypeScript
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation

### Backend

- Node.JS
- Express.JS
- MongoDB
- JWT for authentication

### External APIs

- TMDB (The Movie Database) API

## Project Structure

├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── redux/ # Redux state management
│ │ ├── lib/ # Utilities and interfaces
│ │ └── ...
├── server/ # Backend Node.JS application
│ ├── controllers/ # Request handlers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ └── ...
└── db/ # Database configuration

## Getting Started

### Prerequisites

- Node.JS (v14 or higher)
- MongoDB
- TMDB API key

### Installation

1. Clone the repository
        bash
        git clone [repository-url]

2. Install dependencies for both frontend and backend, and start them both

```bash
# Install frontend dependencies
cd client
npm install
npm run dev

# Install backend dependencies
cd ../server
npm install
npm run dev

# Install database dependencies
cd ../db
npm init -y
npx tsc --init
npx prisma init
customise the database url from .env.example file
npx prisma migrate dev --name init
npx prisma generate (optional)


### Environment Variables
Create `.env` files in both client and server directories:

Frontend (.env)
cp .env.example .env

Backend (.env)
cp .env.example .env

Database (.env)
cp .env.example .env

## API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Movie Endpoints
- `GET /api/v1/movies/trending` - Get trending movies
- `GET /api/v1/movies/:id` - Get movie details
- `GET /api/v1/movies/genre/:id` - Get movies by genre
- `GET /api/v1/get/movie/reviews` - Get reviews for a movie
- `GET /api/v1/get/check/like/movie` - Check whether a movie is liked
- `GET /api/v1/get/check/bookmark/movie` - Check whether a movie is bookmarked
- `GET /api/v1/get/check/watchlist/movie` - Check whether a movie is watchlisted or not

### User Endpoints

- `GET /api/v1/get/watchlist/movie` - Get users watchlist
- `GET /api/v1/get/favourite/movie` - Get users favourites
- `GET /api/v1/get/bookmark/movie` - Get users bookmarked movies
- `GET /api/v1/get/user/reviews` - Get users reviews
- `GET /api/v1/list/movie/:id` - Get watchlisted movies for a user
- `GET /api/v1/bookmark/movie/:id` - Get watchlisted movies for a user
- `GET /api/v1/like/movie/:id` - Get watchlisted movies for a user
- `GET /api/v1/get/review/movie/user` - Get a the review of the user for a movie

- `POST /api/v1/user/watchlist/:movieId` - Add movie to watchlist
- `POST /api/v1/list/movie/:id` - 
- `POST /api/v1/bookmark/movie/:id` - Add movie to bookmarks
- `POST /api/v1/add/movie/review` - Add a review

- `DELETE /api/v1/user/watchlist/:movieId` - Remove from watchlist

## Database Schema

### User Model

{
    name: String,
    email: String,
    password: String,
    isAuthenticated: Boolean,
    createdAt: Date,
    Session: Session?,
    Watchlist: Watchlist[],
    LikedMovies: LikedMovies[],
    Bookmarks Bookmarks[],
    Review: Review[]
}

### and more in db/prisma/schema.prisma file

## Future Improvements
- Implement advanced recommendation algorithms
- Add social features (sharing, following users)
- Enhance mobile responsiveness
- Add more filtering options
- Implement caching for better performance

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

