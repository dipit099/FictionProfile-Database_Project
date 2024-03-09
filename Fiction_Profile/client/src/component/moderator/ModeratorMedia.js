import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ModeratorMedia.css'; // Import your CSS file for styling
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';
import PosterUrl from '../../assets/PosterUrl';
import BackdropUrl from '../../assets/BackdropUrl';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const ModeratorMedia = () => {
    // State variables
    const [modalOpen, setModalOpen] = useState(false);
    const [mediaType, setMediaType] = useState('');
    const [mediaDetails, setMediaDetails] = useState({
        title: '',
        year: '',
        authorDirectorWriter: '',
        language: '',
        runtime: '', // Only for movie and TV
    });
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [posterImage, setPosterImage] = useState(null);
    const [backdropImage, setBackdropImage] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [searchQuery, setSearchQuery] = useState('');
    const [mediaItems, setMediaItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('people_id');

    const [yearStart, setYearStart] = useState(null);
    const [yearEnd, setYearEnd] = useState(null);
    const [ratingStart, setRatingStart] = useState(1);
    const [ratingEnd, setRatingEnd] = useState(10);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);


    /*genre and , genre or, genre exclude*/
    const [genreTypes, setGenreTypes] = useState({ include: [], andInclude: [], exclude: [] });
    const [mediaTypes, setMediaTypes] = useState({ include: [1, 3], exclude: [2, 4] });
    const [selectedGenres, setSelectedGenres] = useState([]);

    // Function to open the modal for adding media
    const openModal = () => {
        setModalOpen(true);
        console.log('Modal opened');
    };

    // Function to close the modal
    const closeModal = () => {
        setMediaType('');
        setMediaDetails({
            title: '',
            year: '',
            authorDirectorWriter: '',
            language: '',
            genre: [],
            runtime: '',
            isbn: '',
        });

        setSelectedGenres([]);
        setPosterImage(null);
        setBackdropImage(null);

        setModalOpen(false);
    };



    // Function to handle changes in media details form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMediaDetails({ ...mediaDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'posterImage') {
            setPosterImage(files[0]);
        } else if (name === 'backdropImage') {
            setBackdropImage(files[0]);
        }
    };

    const handlePublish = async () => {
        try {
            console.log('Publishing media:', mediaDetails);


            const response = await axios.post(`${BASE_URL}/moderator/add_media`, {
                moderatorId: userId,
                mediaType: mediaType,
                title: mediaDetails.title,
                year: mediaDetails.year,
                language: mediaDetails.language,
                runtime: mediaDetails.runtime,
                genre: selectedGenres,
                isbn: mediaDetails.isbn,
                language: mediaDetails.language,
                runtime: mediaDetails.runtime,
                genre: selectedGenres,
            });

            const data = response.data;
            console.log('Media added:', data);
            toast.success('Media added successfully');

            closeModal(); // Close the modal after adding media
        } catch (error) {
            console.error('Error adding media:', error);
            toast.error('Error adding media');
        }
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



    const handleGenreChange = (selectedOptions) => {
        const selected = Array.from(selectedOptions).map(option => option.text);

        setSelectedGenres(prevGenres => {
            const newGenres = [];
            for (const genre of selected) {
                if (!prevGenres.includes(genre)) {
                    newGenres.push(genre);
                }
            }
            return [...prevGenres, ...newGenres];
        });
    };




    const removeGenre = (genreIdToRemove) => {
        const updatedGenres = selectedGenres.filter(genre => genre.id !== genreIdToRemove);
        setSelectedGenres(updatedGenres);
    };


    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };



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



    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilter = async () => {
        try {
            setLoading(true); // Show loading window
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
                    genres: genreTypes,
                    sortBy: sortBy,
                    sortSequence: sortOrder
                }
            });

            const data = response.data;
            setMediaItems(data.media);
            console.log('Media Items:', mediaItems);
            setLoading(false); // Hide loading window after data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // useEffect(() => {
    //     handleFilter();
    // }, [currentPage]);

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




    return (
        <>

            <SideBar />
            <div className="moderator-container">

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
                                </form>
                            </div>
                            <div className="media-items">
                                {mediaItems && mediaItems.map(mediaItem => (
                                    <div key={mediaItem.key_id} className="media-card">
                                        <Link to={`/${mediaItem.type.toLowerCase()}/${mediaItem.id}`} target="_blank">

                                            <div className='media-poster-badge'>
                                                <div className='media-poster'>
                                                    <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                                </div>
                                                <div className="badge">{mediaItem.type}</div>
                                            </div>
                                        </Link>
                                        <div className='discover-media-title'>{mediaItem.title}</div>

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

                            <div className='filter-button-div'>
                                <button type="submit" className="filter-button" onClick={() => handleFilter()}>Filter Results</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="add-media-container">
                    <button className="add-media-button" onClick={openModal}>
                        <span className="plus-icon">+</span>
                        <span className="button-text">Add Media</span>
                    </button>
                </div>

            </div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
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
                <div className="add-media-form">
                    <div className="form-section">
                        <div className="modal-title">Add Media</div>
                    </div>
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="mediaType">Type:</label>
                            <select
                                id="mediaType"
                                name="mediaType"
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value)}
                                className="form-control"
                            >
                                <option value="">Select type</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV</option>
                                <option value="book">Book</option>
                                <option value="manga">Manga</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={mediaDetails.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Other form fields */}
                        <div className="form-group">
                            <label htmlFor="genre">Genre:</label>
                            <select
                                id="genre"
                                name="genre"
                                multiple
                                className="form-control"
                                onChange={(e) => handleGenreChange(e.target.selectedOptions)}
                            >
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="selected-genres">
                            {selectedGenres.length > 0 && (
                                <label>Selected Genres:</label>
                            )}
                            {selectedGenres.map(genre => (
                                <span key={genre} className="selected-genre">
                                    {genre} <button onClick={() => removeGenre(genre)}>X</button>
                                </span>
                            ))}
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="posterImage">Poster Image:</label>
                            <input
                                type="file"
                                id="posterImage"
                                name="posterImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div> */}
                        {/* <div className="form-group">
                    <label htmlFor="backdropImage">Backdrop Image:</label>
                    <input
                        type="file"
                        id="backdropImage"
                        name="backdropImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div> */}
                        {(mediaType === 'movie') && (
                            <div className="form-group">
                                <label htmlFor="runtime">Runtime:</label>
                                <input
                                    type="text"
                                    id="runtime"
                                    name="runtime"
                                    value={mediaDetails.runtime}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        {(mediaType === 'book') && (
                            <div className="form-group">
                                <label htmlFor="ISBN">ISBN for Book:</label>
                                <input
                                    type="text"
                                    id="isbn"
                                    name="isbn"
                                    value={mediaDetails.isbn}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="button-group">
                            <button className="cancel-button" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="submit-button" onClick={handlePublish}>
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Navbar />
        </>
    );
};

export default ModeratorMedia;
