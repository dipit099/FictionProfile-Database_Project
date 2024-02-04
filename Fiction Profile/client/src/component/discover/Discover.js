import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';
import Navbar from '../../config/navbar/Navbar';
import SideBar from '../../config/navbar/SideBar';
import BASE_URL from '../../config/ApiConfig';
import axios from 'axios';

const Discover = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mediaItems, setMediaItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Performing search for:', searchQuery);
    };

    useEffect(() => {
        const fetchMediaItems = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/discover`, {
                    params: {
                        page: currentPage,
                        pageSize: 50,
                    }
                });

                const data = response.data;
                setMediaItems(data.media);
                // setTotalPages(data.totalPages);
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

    return (
        <>

            <SideBar />
            <div className="discover-page">
                <h1>Discover</h1>
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
                                    <Link to={`/movie/${mediaItem.id}`}>
                                        <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                    </Link>
                                    <span className="movie-badge">Movie</span>
                                    <p>{mediaItem.title}</p>
                                    <p>{mediaItem.vote_average}</p>

                                </div>
                            ))}
                        </div>

                        <div className="pagination">
                            {[...Array(totalPages).keys()].map(pageNumber => (
                                <button key={pageNumber + 1} onClick={() => handlePageClick(pageNumber + 1)}>
                                    {pageNumber + 1}
                                </button>
                            ))}
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
        </>
    );
};

export default Discover;
