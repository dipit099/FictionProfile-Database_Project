import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from "../../config/ApiConfig";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MediaList.css';

const MediaList = () => {


    const [mediaList, setMediaList] = useState([]);
    const [people_id, setPeople_id] = useState(''); // Initially set to 1
    const [currentPage, setCurrentPage] = useState(1);
    const [mediaTypes, setMediaTypes] = useState({ include: [1, 2, 3, 4], exclude: [] });
    const [statusTypes, setStatusTypes] = useState({ include: [1, 2, 3], exclude: [] });


    useEffect(() => {
        // Extracting peopleId from URL
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeople_id(lastPart);
    }, []);


    useEffect(() => {
        fetchMediaList();
    }
        , [people_id, currentPage, mediaTypes, statusTypes]);

    const fetchMediaList = async () => {
        try {

            // const response = await axios.get(`${BASE_URL}/dashboard/get_my_media`, {
            //     params: {
            //         user_id: people_id,
            //         mediaTypes: mediaTypes,
            //         statusTypes: statusTypes,
            //         pageNumber: currentPage,

            //     }
            // });
            const response = await axios.get(`${BASE_URL}/dashboard/get_my_media`, {
                params: {
                    user_id: people_id,
                    mediaTypes: mediaTypes,
                    statusTypes: statusTypes,
                    pageNumber: currentPage,
                }
            });
            setMediaList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching media list:', error);
            // toast.error('Error fetching media list');
        }
    }


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

    const handleStatusTypeToggle = (id) => {
        setStatusTypes(prevState => {
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
        }

        );
    };
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
    // const handleFilter = async () => {
    //     fetchMediaList();
    // };

    return (
        <div className="media-list-container">


            <div className="media-items">
                {mediaList && mediaList.map(mediaItem => (
                    <div key={mediaItem.key_id} className="media-card">
                        <Link to={`/${mediaItem.type.toLowerCase()}/${mediaItem.id}`} target="_blank">

                            <div className='media-poster-badge'>
                                <div className='media-poster'>
                                    <img src={mediaItem.poster_path} alt={`${mediaItem.title} Poster`} />
                                </div>
                                <div className="badge">{mediaItem.type}</div>

                            </div>
                        </Link>
                        <div className="status_badge" style={{ backgroundColor: '#892df1', color: 'white', textAlign: 'center', padding: '5px 10px', borderRadius: '5px' }}>
                            {mediaItem.status_type}
                        </div>


                        <div className='discover-media-title' style={{ textAlign: 'center', fontFamily: 'cursive' }}>{mediaItem.title}</div>
                    </div>
                ))}
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

            <div className="add-mediaType-container">
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

                <div className="checkboxes">
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="read-watched"
                            name="read-watched"
                            value="read-watched"
                            checked={statusTypes.include.includes(1)}
                            onChange={() => handleStatusTypeToggle(1)}
                        />
                        <label htmlFor="read-watched">Read/Watched</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="plan-to-read-watch"
                            name="plan-to-read-watch"
                            value="plan-to-read-watch"
                            checked={statusTypes.include.includes(2)}
                            onChange={() => handleStatusTypeToggle(2)}
                        />
                        <label htmlFor="plan-to-read-watch">Plan to Read/Watch</label>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="currently-reading-watching"
                            name="currently-reading-watching"
                            value="currently-reading-watching"
                            checked={statusTypes.include.includes(3)}
                            onChange={() => handleStatusTypeToggle(3)}
                        />
                        <label htmlFor="currently-reading-watching">Currently Reading/Watching</label>
                    </div>
                </div>

            </div>





        </div >
    );
}
export default MediaList;