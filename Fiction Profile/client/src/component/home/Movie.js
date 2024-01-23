// Movie.js
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';
import BASE_URL from "../../config/ApiConfig";
import { FaHeart } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root'); // Assuming 'root' is the ID of your root element

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie`);
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  const renderMediaAddButton = (movie) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(movie)} />;
    }
    return null;
  };

  const renderFavoriteButton = () => {
    if (role === 'user') {
      return <FaHeart className="heart-icon" />;
    }
    return null;
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      console.log('Submitting media:', selectedMovie, selectedStatus);
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Movie ID:', selectedMovie.id);
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        movie_id: selectedMovie.id, // Use the actual property of the movie object that represents its ID
        media_type: 'movie',
        status: selectedStatus,
      });

      // Handle the response data as needed
      console.log('Media added successfully:', response.data);
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    handleCloseModal(); // Close the modal after submitting
  };

  return (
    <div className='Moviediv'>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <div className="movie-item">
              <Link to={`/movie/${movie.id}`}>
                <img src={movie.poster_path} alt={`${movie.title} Poster`} />
                <p>{movie.title}</p>
              </Link>
              <p>{movie.vote_average.toFixed(1)}</p>
              <div className="button-container">
                <p>{renderMediaAddButton(movie)}</p>
                <p>{renderFavoriteButton()}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Popup Modal"
        style={{
          content: {
            width: '400px',
            height: '400px',
            margin: 'auto',
            backgroundColor: '#33539d', /* Green */
          },
        }}
      >
        <div className="popup-content">
          <br /><br />
          <label htmlFor="dropdown">Status:</label>
          <select id="dropdown" name="dropdown" onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="0">Select Status</option>
            <option value="1">Read/Watched</option>
            <option value="2">Plan to Read/Watch</option>
            <option value="3">Currently Reading/Watching</option>
          </select>
          <br /><br /><br />
          <button onClick={handlePopupSubmit}>Submit</button>
        </div>
      </Modal>
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

  const renderMediaAddButton = () => {
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
                  <p>{renderMediaAddButton()}</p>
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

  const renderMediaAddButton = () => {
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
                <p style={{
                  fontSize: '20px',
                  margin: '2px',
                  textAlign: 'center',
                  color: '#ffffff',
                  overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                  // textOverflow: 'ellipsis'
                }}>
                  {movie.title}
                </p>


                <div className="button-container">
                  <p>{renderMediaAddButton()}</p>
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

  const renderMediaAddButton = () => {
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

                  <p>{renderMediaAddButton()}</p>
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
