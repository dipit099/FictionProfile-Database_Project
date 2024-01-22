// Movie.js
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

const Movie = ({ role }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/movie');
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  });

  const renderWishlistButton = () => {
    if (role === 'user') {
      return <button type="button" className="btn btn-outline-primary">Add</button>;
    }
    return null;
  };

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_path} alt={`${movie.title} Poster`} />
            </Link>
            <p>{movie.title}</p>
            <p>{movie.vote_average.toFixed(1)}</p>
            <p>{renderWishlistButton()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Tvshow = ({ role }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/tvshow');
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  });

  const renderWishlistButton = () => {
    if (role === 'user') {
      return <button type="button" className="btn btn-outline-primary">Add</button>;
    }
    return null;
  };

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/tvshow/${movie.id}`}>
              <img src={movie.poster_path} alt={`${movie.title} Poster`} />
            </Link>
            <p>{movie.title}</p>
            {/* <p>{movie.vote_average.toFixed(1)}</p> */}
            <p>{movie.vote_average}</p>
            <p>{renderWishlistButton()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Book = ({ role }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/book');
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  });

  const renderWishlistButton = () => {
    if (role === 'user') {
      return <button type="button" className="btn btn-outline-primary">Add</button>;
    }
    return null;
  };

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/book/${movie.id}`}>
              <img src={movie.poster_path} alt={`${movie.title} Poster`} />
            </Link>
            <p>{movie.title}</p>
            {/* <p>{movie.vote_average.toFixed(1)}</p> */}
            <p>{renderWishlistButton()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
const Manga = ({ role }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/manga');
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  });

  const renderWishlistButton = () => {
    if (role === 'user') {
      return <button type="button" className="btn btn-outline-primary">Add</button>;
    }
    return null;
  };

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/manga/${movie.id}`}>
              <img src={movie.poster_path} alt={`${movie.title} Poster`} />
            </Link>
            <p>{movie.title}</p>
            {/* <p>{movie.vote_average.toFixed(1)}</p> */}
            <p>{movie.vote_average}</p>
            <p>{renderWishlistButton()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export {
  Movie,
  Tvshow,
  Book,
  Manga,
}
