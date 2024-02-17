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
    const [loading, setLoading] = useState(false); // Loading state
    const [searchQuery, setSearchQuery] = useState('');
    const [mediaItems, setMediaItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMediaItem, setSelectedMediaItem] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('0');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('people_id');

    const [genres, setGenres] = useState([]);
    const [yearStart, setYearStart] = useState(null);
    const [yearEnd, setYearEnd] = useState(null);
    const [ratingStart, setRatingStart] = useState(null);
    const [ratingEnd, setRatingEnd] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleRatingStartChange = (event) => {
        setRatingStart(parseInt(event.target.value));
        if (ratingStart > ratingEnd) {
            setRatingEnd(parseInt(event.target.value));
        }
    };

    const handleRatingEndChange = (event) => {
        setRatingEnd(parseInt(event.target.value));
        if (ratingEnd < ratingStart) {
            setRatingStart(parseInt(event.target.value));
        }
    };

    const calculateTrackWidth = () => {
        const range = ratingEnd - ratingStart;
        const width = (range / 10) * 100; // Assuming a range of 1 to 10
        return width + '%';
    };

    const calculateLeftPosition = () => {
        const left = ((ratingStart - 1) / 9) * 100; // Assuming a range of 1 to 10
        return left + '%';
    };

    const calculateRightPosition = () => {
        const right = ((10 - ratingEnd) / 9) * 100; // Assuming a range of 1 to 10
        return right + '%';
    };

    /*genre and , genre or, genre exclude*/
    const [genreTypes, setGenreTypes] = useState({ include: [], andInclude: [], exclude: [] });


    const [mediaTypes, setMediaTypes] = useState({ include: [1, 2, 3, 4], exclude: [] });

    const handleMediaTypeToggle = (id) => {
        setMediaTypes(prevState => {
            const includeIndex = prevState.include.indexOf(id);
            const excludeIndex = prevState.exclude.indexOf(id);

            if (includeIndex === -1) {
                return {
                    include: [...prevState.include, id],
                    exclude: prevState.exclude.filter(excludeId => excludeId !== id)
                };
            } else {
                return {
                    include: prevState.include.filter(includeId => includeId !== id),
                    exclude: [...prevState.exclude, id]
                };
            }
        });
    };


    useEffect(() => {
        console.log('Media Types updated:', mediaTypes);
        // Perform any actions based on the updated mediaTypes state here
    }, [mediaTypes]); // Dependency array ensures the effect runs when mediaTypes changes



    // You won't log mediaTypes immediately after setMediaTypes, 
    // as it will not reflect the updated state due to the asynchronous nature of state updates.



    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };



    useEffect(() => {
        const fetchMediaGenres = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/discover/genre`);
                const data = response.data;
                console.log('Genre List:', data);
                setGenres(data.genres); // Update the state with the received genre list
            } catch (error) {
                console.error('Error fetching genre list:', error);
            }
        };

        fetchMediaGenres();
    }, []);





    useEffect(() => {
        console.log('Current Page:', currentPage);
        const fetchMediaItems = async () => {
            try {
                setIsLoading(true);
                console.log('Fetching media items...');
                const response = await axios.get(`${BASE_URL}/discover`, {
                    params: {
                        userId: userId,
                        page: currentPage,
                        pageSize: 20,
                        search: searchQuery,
                        yearStart: yearStart,
                        yearEnd: yearEnd,
                        ratingStart: ratingStart,
                        ratingEnd: ratingEnd,
                        mediaTypes: mediaTypes
                    }
                });

                const data = response.data;
                setMediaItems(data.media);
                setIsLoading(false);
                console.log('Filter done !');

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMediaItems();
    }, [currentPage]);



    const handleFilter = async () => {
        try {
            isLoadingModal();
            console.log('Filtering media items...');
            const response = await axios.get(`${BASE_URL}/discover`, {
                params: {
                    userId: userId,
                    page: currentPage,
                    pageSize: 20,
                    search: searchQuery,
                    yearStart: yearStart,
                    yearEnd: yearEnd,
                    ratingStart: ratingStart,
                    ratingEnd: ratingEnd,
                    mediaTypes: mediaTypes,
<<<<<<<<< Temporary merge branch 1
                    genres : genreTypes,
                    sortBy: sortBy,
                    sortSequence: sortOrder

                }
            });

            const data = response.data;
            setMediaItems(data.media);
            closeisLoadingModal();
            console.log("Filter Done !");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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

    const isLoadingModal = () => {
        setIsLoading(true);
    };
    const closeisLoadingModal = () => {
        setIsLoading(false);
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
    const handleGenreClick = (genre) => {
        const includeIndex = genreTypes.include.indexOf(genre.id);
        const andIncludeIndex = genreTypes.andInclude.indexOf(genre.id);
        const excludeIndex = genreTypes.exclude.indexOf(genre.id);

        if (includeIndex === -1 && andIncludeIndex === -1 && excludeIndex === -1) {
            // If the genre is not present in any array, add it to the include array
            setGenreTypes(prevState => ({
                ...prevState,
                include: [...prevState.include, genre.id]
            }));
        } else if (includeIndex !== -1) {
            // If the genre is in the include array, move it to the andInclude array
            setGenreTypes(prevState => ({
                ...prevState,
                include: prevState.include.filter(id => id !== genre.id),
                andInclude: [...prevState.andInclude, genre.id]
            }));
        } else if (andIncludeIndex !== -1) {
            // If the genre is in the andInclude array, move it to the exclude array
            setGenreTypes(prevState => ({
                ...prevState,
                andInclude: prevState.andInclude.filter(id => id !== genre.id),
                exclude: [...prevState.exclude, genre.id]
            }));
        } else if (excludeIndex !== -1) {
            // If the genre is in the exclude array, remove it from all arrays
            setGenreTypes(prevState => ({
                ...prevState,
                exclude: prevState.exclude.filter(id => id !== genre.id)
            }));
        }

    };

    // Function to determine button color based on inclusion status
    const getButtonColor = (genreId) => {
        if (genreTypes.include.includes(genreId)) {
            return 'green';
        } else if (genreTypes.andInclude.includes(genreId)) {
            return 'grey';
        } else if (genreTypes.exclude.includes(genreId)) {
            return 'red';
        }
        return '#4a34b7'; // Default color
    };
    useEffect(() => {
        // Perform any actions based on the updated genreTypes state here
    }, [genreTypes]); // Dependency array ensures the effect runs when genreTypes changes


    const years = [...Array(2025 - 1950).keys()].map((year) => 1950 + year);

    const handleYearStartChange = (e) => {
        setYearStart(e.target.value);
    };

    const handleYearEndChange = (e) => {
        setYearEnd(e.target.value);
    };
    return (
        <>
            <SideBar />

            <div className="discover-page">
                <div className='discover-container'>
                    <div className="search-container">
                        <div>
                            <form onSubmit={handleFilter}>
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
                                <div key={mediaItem.key_id} className="media-card">
                                    <Link to={`/${mediaItem.type.toLowerCase()}/${mediaItem.id}`}>

                                        <div className='media-poster-badge'>
                                            <div className='media-poster'>
                                                <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                            </div>
                                            <div className="badge">{mediaItem.type}</div>
                                        </div>
                                    </Link>
                                    <div className='discover-media-title'>{mediaItem.title}</div>
                                    <div className='fa-star-div'><FaStar style={{ color: 'gold' }} /> {Math.floor(mediaItem.vote_average)}/10</div>
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
                        <div className="mediaType-container">
                            <div className="checkboxes">
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="movie"
                                        name="movie"
                                        value="movie"
                                        checked={mediaTypes.include.includes(1)}
                                        onChange={() => handleMediaTypeToggle(1)}
                                    />
                                    <label htmlFor="movie">Movie</label>
                                </div>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="tv"
                                        name="tv"
                                        value="tv"
                                        checked={mediaTypes.include.includes(2)}
                                        onChange={() => handleMediaTypeToggle(2)}
                                    />
                                    <label htmlFor="tv">TV</label>
                                </div>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="manga"
                                        name="manga"
                                        value="manga"
                                        checked={mediaTypes.include.includes(4)}
                                        onChange={() => handleMediaTypeToggle(4)}
                                    />
                                    <label htmlFor="manga">Manga</label>
                                </div>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="book"
                                        name="book"
                                        value="book"
                                        checked={mediaTypes.include.includes(3)}
                                        onChange={() => handleMediaTypeToggle(3)}
                                    />
                                    <label htmlFor="book">Book</label>
                                </div>
                            </div>
                        </div>



                        <div className='genre-container'>
                            {genres.map(genre => (
                                <button
                                    className='genre-button'
                                    key={genre.id}
                                    onClick={() => handleGenreClick(genre)}
                                    style={{ backgroundColor: getButtonColor(genre.id) }}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                        <div className="year-selection-container">
                            <div>
                                <label htmlFor="yearStart"><h5>Choose start year:</h5></label>
                                <select id="yearStart" value={yearStart} onChange={handleYearStartChange} className="year-dropdown">
                                    <option value="">Select a year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="yearEnd"><h5>Choose end year:</h5></label>
                                <select id="yearEnd" value={yearEnd} onChange={handleYearEndChange} className="year-dropdown">
                                    <option value="">Select a year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sort-by-section">
                            <div>
                                <select value={sortBy} onChange={handleSortChange} className="sort-dropdown">
                                    <option value="">Sort by:</option>
                                    <option value="rating">Rating</option>
                                    <option value="popularity">Popularity</option>
                                    <option value="year">Year</option>
                                    <option value="title">Title</option>
                                    <option value="vote_count">Vote Count</option>
                                </select>
                            </div>
                            <div>
                                <select value={sortOrder} onChange={handleSortOrderChange} className="sort-dropdown">
                                    <option value="">Order By:</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>


                        <div className="rating-range-container">
                            <label htmlFor="rating"><h4>Rating Range: <span className="min-val">{ratingStart}</span> - <span className="max-val">{ratingEnd}</span></h4></label>
                            <div className="rating-range-slider">
                                <input
                                    type="range"
                                    className="min-input"
                                    min="1"
                                    max="10"
                                    value={ratingStart}
                                    onChange={handleRatingStartChange}
                                />
                                <input
                                    type="range"
                                    className="max-input"
                                    min="1"
                                    max="10"
                                    value={ratingEnd}
                                    onChange={handleRatingEndChange}
                                />
                                <div className="slider-track" style={{ width: calculateTrackWidth(), left: calculateLeftPosition(), right: calculateRightPosition() }}></div>

                            </div>
                        </div>

                        <div>
                            <button type="submit" className="filter-button" onClick={() => handleFilter()}>Filter Results</button>
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
            <Modal
                isOpen={isLoading}
                contentLabel='Loading Modal'
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                    },
                }}
                onRequestClose={() => { }} // Ensure the modal can't be closed by clicking overlay
                shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
            >
                <div className='popup-content'>
                    <div>
                        Loading...
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Discover;