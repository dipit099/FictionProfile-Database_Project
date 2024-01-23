// Movie.js
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';
import { FaHeart } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
const Movie = () => {
  const [movies, setMovies] = useState([]);
  const role = localStorage.getItem('role');

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
      return <MdAddBox className='add-icon' />
    }
    return null;
  };
  const renderFavoriteButton = () => {
    if (role === 'user') {
      return <FaHeart className="heart-icon" />;
    }
    return null;
  }

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/movie/${movie.id}`}>
              <div className="movie-item">
                <img src={movie.poster_path} alt={`${movie.title} Poster`} />
                <p>{movie.title}</p>
                <p>{movie.vote_average.toFixed(1)}</p>
                <div className="button-container">
                  <p>{renderWishlistButton()}</p>
                  <p>{renderFavoriteButton()}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Tvshow = () => {
  const [movies, setMovies] = useState([]);
  const role = localStorage.getItem('role');

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
  }, []);

  const renderWishlistButton = () => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' />
    }
    return null;
  };
  const renderFavoriteButton = () => {
    if (role === 'user') {
      return <FaHeart className="heart-icon" />;
    }
    return null;
  }

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/tvshow/${movie.id}`}>
              <div className="movie-item">
                <img src={movie.poster_path} alt={`${movie.title} Poster`} />
                <p>{movie.title}</p>
                <p>{movie.vote_average.toFixed(1)}</p>
                <div className="button-container">
                  <p>{renderWishlistButton()}</p>
                  <p>{renderFavoriteButton()}</p>

                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Book = () => {
  const [movies, setMovies] = useState([]);
  const role = localStorage.getItem('role');

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
      return <MdAddBox className='add-icon' />
    }
    return null;
  };
  const renderFavoriteButton = () => {
    if (role === 'user') {
      return <FaHeart className="heart-icon" />;
    }
    return null;
  }

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/book/${movie.id}`}>
              <div className="movie-item">
                <img src={movie.poster_path} alt={`${movie.title} Poster`} />

                <p>{movie.title}</p>
                <div className="button-container">
                  <p>{renderWishlistButton()}</p>
                  <p>{renderFavoriteButton()}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
const Manga = () => {
  const [movies, setMovies] = useState([]);
  const role = localStorage.getItem('role');

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
      return <MdAddBox className='add-icon' />
    }
    return null;
  };
  const renderFavoriteButton = () => {
    if (role === 'user') {
      return <FaHeart className="heart-icon" />;
    }
    return null;
  }
  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/manga/${movie.id}`}>
              <img src={movie.poster_path} alt={`${movie.title} Poster`} />
              <div className="movie-item">
            <p>{movie.title}</p>
            <p>{movie.vote_average.toFixed(1)}</p>
            {/* <p>{movie.vote_average.toFixed(1)}</p> */}
            <div className="button-container">
            
            <p>{renderWishlistButton()}</p>
            <p>{renderFavoriteButton()}</p>
            </div>
            </div>
            </Link>
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
