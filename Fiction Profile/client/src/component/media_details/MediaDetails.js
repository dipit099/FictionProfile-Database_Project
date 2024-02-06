import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MediaDetails.css';
import BASE_URL from "../../config/ApiConfig";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import axios from 'axios';
import Modal from 'react-modal';

const MediaDetails = ({ mediaType }) => {
    const { id } = useParams(); // Extract id from the URL
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMediaItem, setSelectedMediaItem] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('0');
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const role = localStorage.getItem('role');
    const type = mediaType;

    useEffect(() => {
        const fetchMediaDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${mediaType}/${id}`);
                const data = await response.json();
                setMedia(data.media);
            } catch (error) {
                console.error('Error fetching media details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaDetails();
    }, [id, mediaType]);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    if (!media) {
        return <div>No media details found.</div>;
    }

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
            let isFavorite = mediaItem.is_favorite === '1';
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

    // Function to handle rating selection
    const handleRatingSelect = (rating) => {
        setSelectedRating(rating);
    };

    // Function to submit the selected rating
    const handleRatingSubmit = () => {
        console.log('Selected Rating:', selectedRating);
        handleCloseRatingModal();
    };

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
    };

    const handleCloseRatingModal = () => {
        setIsRatingModalOpen(false);
    };

    return (
        <>
            <div className={`MediaDetails-container`}>
                <div className="backdrop" style={{ backgroundImage: `url('${media.backdrop_path}')` }}>
                    <div className="details">
                        <img className="poster" src={media.poster_path} alt={media.title} />
                        <div className='button-container'>
                            <p>{renderMediaAddButton(media)}</p>
                            <p>{renderFavoriteButton(media)}</p>
                            <p className="add-review-button" onClick={openRatingModal}>Rating</p>
                        </div>
                    </div>
                </div>
                <div className='media-details-info-div'>
                    <div>Title: {media.title}</div>
                    <div>Vote Average: {media.vote_average}</div>
                    <div>Original language: {media.original_language}</div>
                    <div>Genres: {media.genres}</div>
                </div>
            </div>
            <div className='media-overview'>
                <div className='overview-details'><h1>Overview:</h1> {media.overview}</div>
            </div>
            <div className="review-box">
                <textarea
                    className="review-textbox"
                    placeholder="Write your review here..."
                    rows="4"
                    cols="50"
                ></textarea>

                <button className="add-review-button">Add your review</button>
            </div>
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
            // Add necessary styles for the modal
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
            <Modal
                isOpen={isRatingModalOpen}
                onRequestClose={handleCloseRatingModal}
                contentLabel='Rating Modal'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                        backdropFilter: 'blur(2px)',

                    },
                    content: {

                        backgroundColor: 'transparent',
                        border: 'none', // Remove border if needed                      

                    },
                }}
            // Add necessary styles for the rating modal
            >
                <div className='rating-modal'>
                    <h2>Select Rating (1-10)<button onClick={handleCloseRatingModal} >   X</button></h2>
                    <div className='rating-options'>
                        {[...Array(10)].map((_, index) => (
                            <button key={index + 1} onClick={() => handleRatingSelect(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                    <button onClick={handleRatingSubmit}>Submit</button>
                </div>
            </Modal>
        </>
    );
};

const MovieDetails = () => {
    return <MediaDetails mediaType="movie" />;
};

const TvshowDetails = () => {
    return <MediaDetails mediaType="tvshow" />;
};

const MangaDetails = () => {
    return <MediaDetails mediaType="manga" />;
};

const BookDetails = () => {
    return <MediaDetails mediaType="book" />;
};

export { MediaDetails, MovieDetails, TvshowDetails, MangaDetails, BookDetails };
