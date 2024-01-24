// Movie.js
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../config/ApiConfig";
import { FaHeart } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root'); // Assuming 'root' is the ID of your root element

const Movie = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie`);
        const data = await response.json();
        setMediaItems(data.media);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediaItems();
  }, []);

  const renderMediaAddButton = (mediaItem) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(mediaItem)} />;
    }
    return null;
  };

  const handleFavoriteAdd = async (mediaItem) => {
    try {
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', mediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_favorite`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'movie', // Adjust this based on the actual media type property
        title_id: mediaItem.id,
      });

      const data = response.data;
      toast.success("Successfully added to favorite");
      // Handle the response data as needed
      if (data.success) {
        console.log("Successfully added to favorite");
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }
  };

  const renderFavoriteButton = (mediaItem) => {
    if (role === 'user') {
      const isFavorite = mediaItem.favorite;
      return (
        <FaHeart
          className={`heart-icon ${isFavorite ? 'in-favorite' : ''}`}
          onClick={() => handleFavoriteAdd(mediaItem)}
        />
      );
    }
    return null;
  };

  const openModal = (mediaItem) => {
    console.log('Media Item ID:', mediaItem.id);
    setSelectedMediaItem(mediaItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("handleCloseModal is Called");
    setSelectedMediaItem(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      console.log('Submitting media:', selectedMediaItem, selectedStatus);
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', selectedMediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'movie', // Adjust this based on the actual media type property
        title_id: selectedMediaItem.id,
        status_id: selectedStatus,
      });

      const data = response.data;
      toast.success("Successfully added media");
      // Handle the response data as needed
      if (data.success) {
        console.log("Successfully added media");
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    // Close the modal
    handleCloseModal();
  };

  return (
    <div className='MediaDiv'>
      <ul>
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.title}>
            <div className="media-item">
              <Link to={`/movie/${mediaItem.id}`}>
                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                <p>{mediaItem.title}</p>
              </Link>
              <p>
                {mediaItem.vote_average.toFixed(1)}
              </p>
              <div className="button-container">
                <p>{renderMediaAddButton(mediaItem)}</p>
                <p>{renderFavoriteButton(mediaItem)}</p>
                
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
            width: '600px',
            height: '600px',
            margin: 'auto',
            backgroundColor: '#032641', /* Green */
            zIndex: 2, /* Ensure the modal appears above the overlay */
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Light-dark and semi-transparent */
            zIndex: 1, /* Ensure the overlay is behind the modal */
            backdropFilter: 'blur(4px)', /* Apply a blur effect to the overlay */
          },
        }}
      >
        <div className="popup-content">
          <span className="close-icon" onClick={handleCloseModal}>X</span>
          {selectedMediaItem && (
            <>
              <div className="media-details">
                <img src={selectedMediaItem.poster_path} alt={`${selectedMediaItem.title} Poster`} />
                <h3>{selectedMediaItem.title}</h3>
              </div>
              <div className="media-overview">
              <label htmlFor="dropdown">Status:</label>
              <select id="dropdown" name="dropdown" onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="0">Select Status</option>
                <option value="1">Read/Watched</option>
                <option value="2">Plan to Read/Watch</option>
                <option value="3">Currently Reading/Watching</option>
              </select>
              <button onClick={handlePopupSubmit}>Save</button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};



const Tvshow = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/tvshow');
        const data = await response.json();
        setMediaItems(data.media);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediaItems();
  }, []);

  const renderMediaAddButton = (mediaItem) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(mediaItem)} />;
    }
    return null;
  };

  const handleFavoriteAdd = async (mediaItem) => {
    try {
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', mediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_favorite`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'tvshow',
        title_id: mediaItem.id,
      });

      const data = response.data;
      toast.success('Successfully added to favorite');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added to favorite');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }
  };

  const renderFavoriteButton = (mediaItem) => {
    if (role === 'user') {
      const isFavorite = mediaItem.favorite;
      return (
        <FaHeart
          className={`heart-icon ${isFavorite ? 'in-favorite' : ''}`}
          onClick={() => handleFavoriteAdd(mediaItem)}
        />
      );
    }
    return null;
  };

  const openModal = (mediaItem) => {
    console.log('Media Item ID:', mediaItem.id);
    setSelectedMediaItem(mediaItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal is Called');
    setSelectedMediaItem(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      console.log('Submitting media:', selectedMediaItem, selectedStatus);
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', selectedMediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'tvshow',
        title_id: selectedMediaItem.id,
        status_id: selectedStatus,
      });

      const data = response.data;
      toast.success('Successfully added media');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added media');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    // Close the modal
    handleCloseModal();
  };

  return (
    <div className='MediaDiv'>
      <ul>
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.title}>
            <div className='media-item'>
              <Link to={`/tv/${mediaItem.id}`}>
                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                <p>{mediaItem.title}</p>
              </Link>
              <p>{mediaItem.vote_average.toFixed(1)}</p>
              <div className='button-container'>
                <p>{renderMediaAddButton(mediaItem)}</p>
                <p>{renderFavoriteButton(mediaItem)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Popup Modal'
        style={{
          content: {
            width: '400px',
            height: '400px',
            margin: 'auto',
            backgroundColor: '#33539d', /* Green */
          },
        }}
      >
        <div className='popup-content'>
          <br /><br />
          <label htmlFor='dropdown'>Status:</label>
          <select id='dropdown' name='dropdown' onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value='0'>Select Status</option>
            <option value='1'>Read/Watched</option>
            <option value='2'>Plan to Read/Watch</option>
            <option value='3'>Currently Reading/Watching</option>
          </select>
          <br /><br /><br />
          <button onClick={handlePopupSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

const Manga = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/manga');
        const data = await response.json();
        setMediaItems(data.media);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediaItems();
  }, []);

  const renderMediaAddButton = (mediaItem) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(mediaItem)} />;
    }
    return null;
  };

  const handleFavoriteAdd = async (mediaItem) => {
    try {
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', mediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_favorite`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'manga', // Adjust this based on the actual media type property
        title_id: mediaItem.id,
      });

      const data = response.data;
      toast.success('Successfully added to favorite');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added to favorite');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }
  };

  const renderFavoriteButton = (mediaItem) => {
    if (role === 'user') {
      const isFavorite = mediaItem.favorite;
      return (
        <FaHeart
          className={`heart-icon ${isFavorite ? 'in-favorite' : ''}`}
          onClick={() => handleFavoriteAdd(mediaItem)}
        />
      );
    }
    return null;
  };

  const openModal = (mediaItem) => {
    console.log('Media Item ID:', mediaItem.id);
    setSelectedMediaItem(mediaItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal is Called');
    setSelectedMediaItem(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      console.log('Submitting media:', selectedMediaItem, selectedStatus);
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', selectedMediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'manga', // Adjust this based on the actual media type property
        title_id: selectedMediaItem.id,
        status_id: selectedStatus,
      });

      const data = response.data;
      toast.success('Successfully added media');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added media');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    // Close the modal
    handleCloseModal();
  };

  return (
    <div className='MediaDiv'>
      <ul>
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.title}>
            <div className='media-item'>
              <Link to={`/manga/${mediaItem.id}`}>
                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                <p style={{
                  fontSize: '20px',
                  margin: '2px',
                  textAlign: 'center',
                  color: '#ffffff',
                  overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                  // textOverflow: 'ellipsis'
                }}>
                  {mediaItem.title}
                </p>
              </Link>
              <div className='button-container'>
                <p>{renderMediaAddButton(mediaItem)}</p>
                <p>{renderFavoriteButton(mediaItem)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Popup Modal'
        style={{
          content: {
            width: '400px',
            height: '400px',
            margin: 'auto',
            backgroundColor: '#33539d', /* Green */
          },
        }}
      >
        <div className='popup-content'>
          <br /><br />
          <label htmlFor='dropdown'>Status:</label>
          <select id='dropdown' name='dropdown' onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value='0'>Select Status</option>
            <option value='1'>Read/Watched</option>
            <option value='2'>Plan to Read/Watch</option>
            <option value='3'>Currently Reading/Watching</option>
          </select>
          <br /><br /><br />
          <button onClick={handlePopupSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

const Book = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch('http://localhost:5197/trending/book');
        const data = await response.json();
        setMediaItems(data.media);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediaItems();
  }, []);

  const renderMediaAddButton = (mediaItem) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(mediaItem)} />;
    }
    return null;
  };

  const handleFavoriteAdd = async (mediaItem) => {
    try {
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', mediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_favorite`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'book', // Adjust this based on the actual media type property
        title_id: mediaItem.id,
      });

      const data = response.data;
      toast.success('Successfully added to favorite');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added to favorite');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }
  };

  const renderFavoriteButton = (mediaItem) => {
    if (role === 'user') {
      const isFavorite = mediaItem.favorite;
      return (
        <FaHeart
          className={`heart-icon ${isFavorite ? 'in-favorite' : ''}`}
          onClick={() => handleFavoriteAdd(mediaItem)}
        />
      );
    }
    return null;
  };

  const openModal = (mediaItem) => {
    console.log('Media Item ID:', mediaItem.id);
    setSelectedMediaItem(mediaItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal is Called');
    setSelectedMediaItem(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      console.log('Submitting media:', selectedMediaItem, selectedStatus);
      console.log('User ID:', localStorage.getItem('people_id'));
      console.log('Media Item ID:', selectedMediaItem.id);
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        media_type: 'book', // Adjust this based on the actual media type property
        title_id: selectedMediaItem.id,
        status_id: selectedStatus,
      });

      const data = response.data;
      toast.success('Successfully added media');
      // Handle the response data as needed
      if (data.success) {
        console.log('Successfully added media');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    // Close the modal
    handleCloseModal();
  };

  return (
    <div className='MediaDiv'>
      <ul>
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.title}>
            <div className='media-item'>
              <Link to={`/book/${mediaItem.id}`}>
                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                <p style={{
                  // fontSize: '20px',
                  // margin: '2px',
                  // textAlign: 'center',
                  // color: '#ffffff',
                  // overflow: 'hidden',
                  // whiteSpace: 'nowrap',
                  // textOverflow: 'ellipsis'
                }}>
                  {mediaItem.title}
                </p>
              </Link>
              <div className='button-container'>
                <p>{renderMediaAddButton(mediaItem)}</p>
                <p>{renderFavoriteButton(mediaItem)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Popup Modal'
        style={{
          content: {
            width: '400px',
            height: '400px',
            margin: 'auto',
            backgroundColor: '#33539d', /* Green */
          },
        }}
      >
        <div className='popup-content'>
          <br /><br />
          <label htmlFor='dropdown'>Status:</label>
          <select id='dropdown' name='dropdown' onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value='0'>Select Status</option>
            <option value='1'>Read/Watched</option>
            <option value='2'>Plan to Read/Watch</option>
            <option value='3'>Currently Reading/Watching</option>
          </select>
          <br /><br /><br />
          <button onClick={handlePopupSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};





export {
  Movie,
  Tvshow,
  Book,
  Manga,
}
