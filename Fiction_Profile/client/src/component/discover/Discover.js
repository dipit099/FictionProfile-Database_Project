import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaHeart } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

import Modal from 'react-modal';
import Navbar from '../../config/navbar/Navbar';
import SideBar from '../../config/navbar/SideBar';
import BASE_URL from '../../config/ApiConfig';
import axios from 'axios';

const Discover = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mediaItems, setMediaItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMediaItem, setSelectedMediaItem] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('0');
    const role = localStorage.getItem('role');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Performing search for:', searchQuery);
    };

    useEffect(() => {
        console.log('Current Page:', currentPage);
        const fetchMediaItems = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/discover`, {
                    params: {
                        page: currentPage,
                        pageSize: 20,
                    }
                });

                const data = response.data;
                setMediaItems(data.media);
                console.log('Media Items:', mediaItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMediaItems();
    }, [currentPage]);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPageNumbers = () => {

        const pageNumbers = [];
        let startPage = Math.max(1, currentPage);
        let endPage = (startPage + 9);

        if (currentPage <= 10) {
            startPage = 1;
            endPage = 10;

        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }

        return pageNumbers;
    };

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
                media_type: mediaItem.type,
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

    const handlePopupSubmit = async (mediaItem) => {
        try {
            const response = await axios.post(`${BASE_URL}/user_media_add`, {
                user_id: localStorage.getItem('people_id'),
                media_type: mediaItem.type,
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
        <>
            <SideBar />
            <div className="discover-page">
                <div className='discover-container'>
                    <div className="search-container">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className="media-items">
                            {mediaItems && mediaItems.map(mediaItem => (
                                <div key={mediaItem.id} className="media-card">
                                    <Link to={`/${mediaItem.type}/${mediaItem.id}`}>
                                        <div className='media-poster-badge'>
                                            <div className='media-poster'>
                                                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                            </div>
                                            <div className="badge">{mediaItem.type}</div>
                                        </div>
                                    </Link>
                                    <div>{mediaItem.title}</div>
                                    <div>{mediaItem.vote_average}</div>
                                    <div className='discover-button-container'>
                                        <p>{renderMediaAddButton(mediaItem)}</p>
                                        <p>{renderFavoriteButton(mediaItem)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="pagination">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
                                </li>
                                {renderPageNumbers()}
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>Next</button>
                                </li>
                            </ul>
                        </div>


                    </div>
                    <div className='filter-container'>
                        <h3>Filter</h3>
                        <div className='filter-option'>
                            <input type="checkbox" id="tv" name="tv" value="tv" />
                            <label htmlFor="tv">TV</label>
                        </div>
                        <div className='filter-option'>
                            <input type="checkbox" id="manga" name="manga" value="manga" />
                            <label htmlFor="manga">Manga</label>
                        </div>
                        <div className='filter-option'>
                            <input type="checkbox" id="book" name="book" value="book" />
                            <label htmlFor="book">Book</label>
                        </div>

                    </div>
                </div>
            </div>
            <Navbar />
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
                    <button onClick={() => handlePopupSubmit(selectedMediaItem)}>Submit</button>

                </div>
            </Modal>
        </>
    );
};

export default Discover;
