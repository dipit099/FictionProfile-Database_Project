import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MediaDetails.css';
import BASE_URL from "../../config/ApiConfig";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import axios from 'axios';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import RatingsChart from './RatingsChart';
import Navbar from '../../config/navbar/Navbar';

const MediaDetails = ({ mediaType }) => {
    const { id } = useParams(); // Extract id from the URL
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMediaItem, setSelectedMediaItem] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const role = localStorage.getItem('role');
    const people_id = localStorage.getItem('people_id');
    const type = mediaType;
    const [reviewCaption, setReviewCaption] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviews, setReviews] = useState([]);

    const [showInputFields, setShowInputFields] = useState(false);
    const [ratingsData, setRatingsData] = useState([]);



    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedMediaDetails, setEditedMediaDetails] = useState({
        title: '',
        description: '',
        release_date: '',
        language: '',
        runtime: ''
    });





    const handleHoverRating = (rating) => {
        setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };



    const handleReviewvote = async (index, voteValue) => {
        try {
            const updatedReviews = [...reviews];
            const reviewId = updatedReviews[index].review_id; // Assuming there's a unique identifier for each review, like review_id
            const user_id = localStorage.getItem('people_id'); // Get the user ID from localStorage or wherever it's stored

            // Update the UI instantly to reflect the vote
            // Update the UI instantly to reflect the vote
            if (voteValue === 1) {
                updatedReviews[index].vote_value = updatedReviews[index].vote_value === 1 ? 0 : 1;
            } else if (voteValue === -1) {
                updatedReviews[index].vote_value = updatedReviews[index].vote_value === -1 ? 0 : -1;
            }


            // Update the state to reflect the UI changes
            setReviews(updatedReviews);

            // Send the vote to the server
            const response = await axios.post(`${BASE_URL}/review/addvote`, {
                user_id: user_id,
                review_id: reviewId,
                vote: voteValue
            });

            if (response.data.success) {

                toast.success('Vote submitted successfully');
            } else {
                toast.error('Vote submission failed');
            }
        } catch (error) {
            // Handle any errors that occur during the vote submission process
            console.error('Error submitting vote:', error);
        }
    };

    useEffect(() => {
        const fetchMediaDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
                    params: {
                        user_id: people_id,
                        id: id,
                        media_type: mediaType,
                    }
                });

                setMedia(response.data.media);
                setEditedMediaDetails({
                    title: response.data.media.title,
                    description: response.data.media.overview,
                    release_date: response.data.media.release_date,
                    language: response.data.media.original_language,
                    runtime: response.data.media.runtime
                });

                if (role !== 'moderator') {

                    const result = await axios.get(`${BASE_URL}/review`, {
                        params: {
                            media_id: id,
                            media_type: mediaType,
                            userId: people_id,
                        }
                    });


                    setReviews(result.data.reviews);


                    const ratingResponse = await axios.get(`${BASE_URL}/rating/getmyrating`, {
                        params: {
                            user_id: people_id,
                            media_id: id,
                            media_type: mediaType
                        }
                    });

                    if (ratingResponse.data.rating) {
                        setSelectedRating(ratingResponse.data.rating);
                    }

                    const allRatingResponse = await axios.get(`${BASE_URL}/rating`, {
                        params: {
                            media_id: id,
                            media_type: mediaType
                        }
                    });

                    const receivedRatings = allRatingResponse.data;

                    const initialRatingsData = Array.from({ length: 10 }, (_, index) => ({
                        rating: 10 - index,
                        count: 0
                    }));

                    // Update counts for ratings available in the received data
                    receivedRatings.forEach(({ rating, count }) => {
                        const index = 10 - rating; // Adjust the index calculation for the reversed order
                        initialRatingsData[index].count = count;
                    });


                    // Set ratings data
                    setRatingsData(initialRatingsData);

                    // setRatingsData(allRatingResponse.data); // Assuming the response contains ratingCounts array
                    // console.log('allRatingResponse:', allRatingResponse.data);
                }

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
            let isFavorite = mediaItem.is_favorite === '1';
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

    const openModal = async (mediaItem) => {
        setSelectedMediaItem(mediaItem);
        setIsModalOpen(true);
        try {
            const response = await axios.get(`${BASE_URL}/user_media_add/get_added_option`, {
                params: {
                    user_id: localStorage.getItem('people_id'),
                    media_type: type,
                    title_id: mediaItem.id,
                }
            });
            if (response.data.status_id !== 0) {
                setSelectedStatus(response.data.status_id);
            }

        }
        catch (error) {
            console.error('Error fetching added option:', error.message);
        }


    };

    const handleCloseModal = () => {
        setSelectedMediaItem(null);
        setIsModalOpen(false);
    };

    const handleEditCloseModal = () => {
        setIsEditModalOpen(false);
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
            const ratingResponse = await axios.get(`${BASE_URL}/rating/getmyrating`, {
                params: {
                    user_id: people_id,
                    media_id: id,
                    media_type: mediaType
                }
            });

            if (ratingResponse.data.rating) {
                setSelectedRating(ratingResponse.data.rating);
            }
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
                setShowInputFields(false);
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
        backgroundImage: `url('${media.backdrop_path}')`,

    };


    // Function to handle changes in media details
    const handleMediaDetailsChange = (e) => {
        const { name, value } = e.target;
        setEditedMediaDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handlEditMedia = async () => {

        try {
            const result = await axios.post(`${BASE_URL}/moderator/edit_media`, {
                media_id: id,
                mediaType: mediaType,
                title: editedMediaDetails.title,
                description: editedMediaDetails.description,
                release_date: editedMediaDetails.release_date ? editedMediaDetails.release_date.split('-')[0] : '',
                language: editedMediaDetails.language,
                runtime: editedMediaDetails.runtime,
                moderatorId: people_id

            });
            if (result.data.success) {
                toast.success('Media updated successfully');
                setIsEditModalOpen(false);
            }
        }
        catch (error) {
            console.error('Error updating media:', error);
        }

    }

    const handleDeleteMedia = async () => {
        try {
            const result = await axios.post(`${BASE_URL}/moderator/remove_media`, {
                media_id: id,
                mediaType: mediaType,
                moderatorId: people_id
            });
            if (result.data.success) {
                toast.success('Media removed successfully');
            }

        }
        catch (error) {
            console.error('Error removing media:', error);
        }
    }




    return (
        <div className="MediaDetails">
            <div className={"MediaDetails-container"}>
                <div className="backdrop" >
                    <img className="backdrop-poster" src={media.backdrop_path} alt={media.title} />
                    <div className='details-poster-div'>
                        <div className="media-details">
                            <div>
                                <img className="poster" src={media.poster_path} alt={media.title} />
                            </div>
                            <div className="media-info">
                                <div className='media-title'>
                                    {media.title} {media.release_date ? (new Date(media.release_date).getFullYear()) : ''}

                                    {role === 'moderator' && (
                                        <button className='edit-button' onClick={() => setIsEditModalOpen(true)}>Edit</button>

                                    )}
                                    {role === 'moderator' && (
                                        <button className='edit-button' onClick={handleDeleteMedia}>Delete</button>

                                    )}
                                </div>

                                <div className='media-genres'>
                                    {media.genres} {media.runtime ? `| ${media.runtime} min` : ''}  {media.original_language ? `| Language: ${media.original_language}` : ''}
                                </div>


                                <div className='button-container'>
                                    {role === 'user' && (
                                        <div className='circle'>{renderMediaAddButton(media)}</div>)}
                                    {role === 'user' && (
                                        <div className='circle'>{renderFavoriteButton(media)}</div>)}

                                    <div className='rating-star'>
                                        {/* <FaStar style={{ color: 'gold' }} /> {(Math.floor(media.vote_average * 10) / 10).toFixed(1)}/10 */}
                                        <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'gold', fontSize: '32px' }} /> {(Math.floor(media.vote_average * 10) / 10).toFixed(1)}/10
                                    </div>
                                    {role === 'user' && (
                                        <div className="add-rating-button" onClick={openRatingModal}>Your Rating </div>
                                    )}
                                </div>



                                <div className='media-overview'><h2>Overview</h2>{media.overview}</div>

                            </div>
                        </div>
                    </div>


                </div>
                {role === 'user' && (
                    <div className="rating-review-div">
                        <div className="rating-box">
                            <h2 className="rating-title">Your Rating</h2>
                            <div className="rating-value">{media.user_rating ? media.user_rating : 'Not rated yet'}</div>
                            <div>
                                <h2>Ratings Distribution</h2>
                                <table className="ratings-table">
                                    <thead>
                                        <tr>
                                            <th>Rating</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ratingsData.map((rating, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                                <td>{rating.rating}</td>
                                                <td>{rating.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <RatingsChart ratingsData={ratingsData} />
                            </div>



                        </div>

                        <div className="review-box">
                            <div className="reviews-header">
                                <h2 className="reviews-title">Top Reviews</h2>
                                {!showInputFields && (
                                    <button className="add-review-button" onClick={() => setShowInputFields(true)}>Add your review</button>
                                )}
                            </div>


                            {showInputFields && (
                                <div>
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
                                    <div className='reviews-header'>
                                        <button className="add-review-button" onClick={handleReviewSubmit}>Submit</button>
                                        <button className="add-review-button" onClick={() => setShowInputFields(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            <div className="reviews-container">
                                <ul className="reviews-list">
                                    {reviews.map((review, index) => (
                                        <li key={index} className="review-item">
                                            <p className="review-user" style={{ fontSize: '20px' }}>User : {review.username} -- {new Date(review.added_date).toLocaleDateString()}</p>
                                            <p className="review-title" style={{ fontSize: '24px' }}>Title : {review.title}</p>
                                            <p className="review-content" style={{ fontSize: '18px' }}>{review.review}</p>
                                            <div className='upvote-downvote-div'>
                                                <FontAwesomeIcon
                                                    icon={faThumbsUp}
                                                    onClick={() => handleReviewvote(index, 1)}
                                                    style={{ color: review.vote_value === 1 ? 'green' : 'white', cursor: 'pointer', marginRight: '15px', fontSize: '30px' }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faThumbsDown}
                                                    onClick={() => handleReviewvote(index, -1)}
                                                    style={{ color: review.vote_value === -1 ? 'red' : 'white', cursor: 'pointer', fontSize: '30px' }}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                        </div>

                    </div>
                )}
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
                    <select id='dropdown' name='dropdown' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
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
                            <span className='selected-rating'>{hoverRating || selectedRating}</span><small> / 10</small>
                        </h2>
                        <div className='rating-options'>
                            {[...Array(10)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    type='button'
                                    className={`btnrating btn btn-default btn-lg ${index + 1 <= (hoverRating || selectedRating) ? 'selected' : ''}`}
                                    data-attr={index + 1}
                                    onMouseEnter={() => handleHoverRating(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleRatingSelect(index + 1)}
                                >
                                    <FaStar className={`fa-star ${index + 1 <= (hoverRating || selectedRating) ? 'gold' : ''}`} />
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
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={handleEditCloseModal}
                contentLabel='Popup Modal'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                        backdropFilter: 'blur(2px)',
                    },
                    content: {
                        width: '800px',
                        height: '800px',
                        margin: 'auto',
                        backgroundColor: '#032641', // Transparent background for the modal content
                        border: 'none', // Remove border if needed
                        boxShadow: 'none', // Remove box shadow if needed
                    },
                }}
            >
                <div className="edit-modal-content">
                    <span className="edit-close" onClick={handleEditCloseModal}>&times;</span>
                    <h2 className="edit-title">Edit Media</h2>
                    <div className="edit-form-group">
                        <label htmlFor="edit-title" className="edit-label">Title:</label>
                        <input
                            type="text"
                            id="edit-title"
                            name="edit-title"
                            value={editedMediaDetails.title}
                            onChange={(e) => setEditedMediaDetails({ ...editedMediaDetails, title: e.target.value })}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-form-group">
                        <label htmlFor="edit-description" className="edit-label">Overview:</label>
                        <textarea
                            id="edit-description"
                            name="edit-description"
                            value={editedMediaDetails.description}
                            onChange={(e) => setEditedMediaDetails({ ...editedMediaDetails, description: e.target.value })}
                            className="edit-textarea"
                        ></textarea>
                    </div>
                    <div className="edit-form-group">
                        <label htmlFor="edit-release_date" className="edit-label">Release Year(yyyy):</label>
                        <input
                            type="number" // Use type="number" to ensure only numeric input
                            id="edit-release_date"
                            name="edit-release_date"
                            value={editedMediaDetails.release_date ? editedMediaDetails.release_date.split('-')[0] : ''} // Extracting the year part
                            onChange={(e) => setEditedMediaDetails({ ...editedMediaDetails, release_date: e.target.value })}
                            className="edit-input"
                            placeholder="Enter year (yyyy)"
                            min="1900" // Set a minimum year as per your requirements
                            max="2100" // Set a maximum year as per your requirements
                        />
                    </div>


                    <div className="edit-form-group">
                        <label htmlFor="edit-language" className="edit-label">Language:</label>
                        <input
                            type="text"
                            id="edit-language"
                            name="edit-language"
                            value={editedMediaDetails.language}
                            onChange={(e) => setEditedMediaDetails({ ...editedMediaDetails, language: e.target.value })}
                            className="edit-input"
                        />
                    </div>
                    <div className="edit-form-group">
                        <label htmlFor="edit-runtime" className="edit-label">Runtime(min):</label>
                        <input
                            type="text"
                            id="edit-runtime"
                            name="edit-runtime"
                            value={editedMediaDetails.runtime}
                            onChange={(e) => setEditedMediaDetails({ ...editedMediaDetails, runtime: e.target.value })}
                            className="edit-input"
                        />
                    </div>
                    <button onClick={handlEditMedia} className="edit-publish-button">Update</button>
                </div>


            </Modal>

            <Navbar />
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