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
                                    <div>
                                        <Link to={`/movie/${mediaItem.id}`}>
                                            <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                            <div className="badge">Movie</div>
                                        </Link>
                                    </div>
                                    <div>{mediaItem.title}</div>
                                    <div>{mediaItem.vote_average}</div>

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
        </>
    );
};

export default Discover;
