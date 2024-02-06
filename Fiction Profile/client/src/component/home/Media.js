import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Media.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaHeart } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';

import Modal from 'react-modal';
import axios from 'axios';
import BASE_URL from '../../config/ApiConfig';

Modal.setAppElement('#root');

const Media = ({ type }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        // send people_id to the server
        const response = await axios.get(`${BASE_URL}/trending/${type}`,{
          params: {
            people_id: localStorage.getItem('people_id')
          }
        });
        const data = response.data;
        setMediaItems(data.media);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediaItems();
  }, [type]);

  const renderMediaAddButton = (mediaItem) => {
    if (role === 'user') {
      return <MdAddBox className='add-icon' onClick={() => openModal(mediaItem)} />;
    }
    return null;
  };

  const handleFavoriteAdd = async (mediaItem) => {
    try {
      const response = await axios.post(`${BASE_URL}/user_favorite`, {
        user_id: localStorage.getItem('people_id'),
        media_type: type,
        title_id: mediaItem.id,
      });

      const data = response.data;
      toast.success('Successfully added to favorite');
      if (data.success) {
        console.log('Successfully added to favorite');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }
  };

  const renderFavoriteButton = (mediaItem) => {
    if (role === 'user') {
      let isFavorite = mediaItem.is_favorite == '1';
      return (
        <FaHeart
          className={`heart-icon ${isFavorite ? 'favorite' : ''}`}
          onClick={() => handleFavoriteAdd(mediaItem)}
        />
      );
    }
    return null;
  };

  const openModal = (mediaItem) => {
    setSelectedMediaItem(mediaItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMediaItem(null);
    setIsModalOpen(false);
  };

  const handlePopupSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user_media_add`, {
        user_id: localStorage.getItem('people_id'),
        media_type: type,
        title_id: selectedMediaItem.id,
        status_id: selectedStatus,
      });

      const data = response.data;
      toast.success('Successfully added media');
      if (data.success) {
        console.log('Successfully added media');
      }
    } catch (error) {
      console.error('Error during adding media:', error.message);
    }

    handleCloseModal();
  };

  return (
    <div className='MediaDiv'>
      <ul>
        {mediaItems.map((mediaItem) => (
          <li key={mediaItem.title}>
            <div className='media-item'>
              <Link to={`/${type}/${mediaItem.id}`}>
                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                <p>{mediaItem.title}</p>
              </Link>
              {/* <p>{mediaItem.vote_average.toFixed(1)}</p> */}
              <p>{mediaItem.vote_average}</p>
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
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
            backdropFilter: 'blur(2px)',

          },
          content: {
            width: '600px',
            height: '600px',
            margin: 'auto',
            backgroundColor: '#032641', // Transparent background for the modal content
            border: 'none', // Remove border if needed
            boxShadow: 'none', // Remove box shadow if needed

          },
        }}
      >
        <div className='popup-content'>
          <span className="close-icon" onClick={handleCloseModal}>X</span>
          {selectedMediaItem && (
            <>
              <img src={selectedMediaItem.poster_path} alt={`${selectedMediaItem.title} Poster`} />
              <h4>{selectedMediaItem.title}</h4>
            </>
          )}
          <label htmlFor='dropdown'>Status:</label>
          <select id='dropdown' name='dropdown' onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value='0'>Select Status</option>
            <option value='1'>Read/Watched</option>
            <option value='2'>Plan to Read/Watch</option>
            <option value='3'>Currently Reading/Watching</option>
          </select>
          <button onClick={handlePopupSubmit}>Submit</button>
        </div>
      </Modal>

    </div>
  );
};


const Movie = () => {
  return <Media type="movie" />;
};

const TvShow = () => {
  return <Media type="tvshow" />;
};

const Manga = () => {
  return <Media type="manga" />;
};

const Book = () => {
  return <Media type="book" />;
};

export { Movie, TvShow, Manga, Book };

