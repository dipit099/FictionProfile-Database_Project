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
import { FaStar } from 'react-icons/fa';

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
    const people_id = localStorage.getItem('people_id');
    const type = mediaType;
    const [reviewCaption, setReviewCaption] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMediaDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${mediaType}/${id}`);
                const data = await response.json();
                setMedia(data.media);

                const result = await axios.get(`${BASE_URL}/review`, {
                    params: {
                        media_id: id,
                        media_type: mediaType
                    }
                });


                setReviews(result.data.reviews);

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
            if (data.success) {
                if (mediaItem.is_favorite === '1') {
                    toast.success('Removed from favorites');
                    mediaItem.is_favorite = '0';
                } else {
                    toast.success('Added to favorites');
                    mediaItem.is_favorite = '1';
                }
                // Update the heart icon color instantly based on is_favorite value
                const heartIcon = document.getElementById(`heart-icon-${mediaItem.id}`);
                if (heartIcon) {
                    heartIcon.classList.toggle('favorite', mediaItem.is_favorite === '1');
                }
                console.log('mediaItem:', mediaItem);
                console.log('heartIcon:', mediaItem.is_favorite);
            }
        } catch (error) {
            console.error('Error during adding media:', error.message);
        }
    };


    const renderFavoriteButton = (mediaItem) => {
        if (role === 'user') {
            let isFavorite = mediaItem.is_favorite === '0';
            return (
                <FaHeart
                    id={`heart-icon-${mediaItem.id}`} // Unique ID for each heart icon
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

    const handleRatingSubmit = async () => {
        try {
            console.log('selectedRating:', selectedRating);
            console.log('people_id:', people_id);
            console.log('id:', id);
            console.log('type:', type);

            const response = await axios.post(`${BASE_URL}/rating/add`, {
                user_id: people_id,
                selectedRating: selectedRating,
                media_id: id,
                media_type: type,
            });

            // Close the rating modal after successful submission
            handleCloseRatingModal();
            setSelectedRating(0);
            if (response.data.success) {
                toast.success('Rating added successfully');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            // Handle error scenarios, e.g., show an error message to the user
        }
    };


    const handleReviewSubmit = async () => {
        try {
            console.log('review:', document.querySelector('.review-textbox').value);
            console.log('people_id:', people_id);
            console.log('id:', id);
            console.log('type:', type);

            const response = await axios.post(`${BASE_URL}/review/add`, {
                user_id: people_id,
                review: reviewContent,
                title: reviewCaption,
                media_id: id,
                media_type: type,
            });

            if (response.data.success) {
                toast.success('Review added successfully');
                setReviewCaption('');
                setReviewContent('');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const openRatingModal = () => {
        setIsRatingModalOpen(true);
    };

    const handleCloseRatingModal = () => {
        setIsRatingModalOpen(false);
    };
    // Define the backgroundImage style separately
    const backdropStyle = {
        backgroundImage: `url('${media.backdrop_path}')`
    };

    // Apply the backdropStyle within the JSX



    return (
        <div className="MediaDetails">
            <div className={"MediaDetails-container"}>
                <div className="backdrop" style={backdropStyle}>
                    <div className="details">
                        <img className="poster" src={media.poster_path} alt={media.title} />
                        <div className='button-container'>
                            <div>{renderMediaAddButton(media)}</div>
                            <div>{renderFavoriteButton(media)}</div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='rating-details'>
                <div className='media-title'>{media.title}
                </div>

                <div className='rating-star'>
                    <FaStar style={{ color: 'gold' }} /> {Math.floor(media.vote_average)}/10
                </div>
                <div className="add-rating-button" onClick={openRatingModal}>Add your rating</div>
            </div>
            <div className='media-details-info-div'>
                <div>Genres: {media.genres}</div>
            </div>
            <div className='media-overview'>
                <div className='overview-details'><div>Overview:</div> {media.overview}</div>
            </div>
            <div className="review-box">
                <textarea
                    className="review-textbox"
                    type="text"
                    value={reviewCaption}
                    onChange={(e) => setReviewCaption(e.target.value)}
                    placeholder="Enter review caption"
                />
                <textarea
                    className="review-textbox"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Write your review here..."
                    rows="4"
                    cols="50"
                ></textarea>

                <button className="add-review-button" onClick={handleReviewSubmit}>Submit</button>

                <div className="reviews-container">
                    <h2 className="reviews-title">Top Reviews</h2>
                    <ul className="reviews-list">
                        {reviews.map((review, index) => (
                            <li key={index} className="review-item">
                                <p className="review-user">User : {review.username}</p>
                                <h3 className="review-title">Title : {review.title}</h3>
                                <p className="review-content">{review.review}</p>
                            </li>
                        ))}
                    </ul>
                </div>
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
            >
                <div className='rating-modal-content'>
                    <div className='form-group' id='rating-ability-wrapper'>
                        <label className='control-label' htmlFor='rating'>
                            <span className='field-label-header'>How would you rate?</span><br />
                            <span className='field-label-info'></span>
                            <input type='hidden' id='selected_rating' name='selected_rating' value='' required='required' />
                        </label>
                        <h2 className='bold rating-header'>
                            <span className='selected-rating'>{selectedRating}</span><small> / 10</small>
                        </h2>
                        <div className='rating-options'>
                            {[...Array(10)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    type='button'
                                    className={`btnrating btn btn-default btn-lg ${index + 1 <= selectedRating ? 'selected' : ''}`}
                                    data-attr={index + 1}
                                    onClick={() => handleRatingSelect(index + 1)}
                                >
                                    <FaStar className={`fa-star ${index + 1 <= selectedRating ? 'gold' : ''}`} />
                                </button>
                            ))}

                        </div>
                    </div>
                    <div className='rating-button-container'>
                        <button className='rating-submit-button' onClick={handleRatingSubmit}>Submit</button>
                        <button className='rating-close-button' onClick={handleCloseRatingModal}>Close</button>

                    </div>
                </div>

            </Modal>

        </div>
    );
};

const MovieDetails = () => {
    return <MediaDetails mediaType="movie" />;
};

const TvshowDetails = () => {
    return <MediaDetails mediaType="tv" />;
};

const MangaDetails = () => {
    return <MediaDetails mediaType="manga" />;
};

const BookDetails = () => {
    return <MediaDetails mediaType="book" />;
};

export { MediaDetails, MovieDetails, TvshowDetails, MangaDetails, BookDetails };
