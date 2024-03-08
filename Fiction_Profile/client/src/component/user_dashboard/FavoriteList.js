import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
import BASE_URL from '../../config/ApiConfig';
import './FavoriteList.css'; // Import CSS file for styling

const FavoriteList = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [favoriteGenresData, setFavoriteGenresData] = useState([]);
    const [people_id, setPeople_id] = useState(''); // Initially set to 1
    const [currentPage, setCurrentPage] = useState(1);
    const [mediaTypes, setMediaTypes] = useState({ include: [1, 2, 3, 4], exclude: [] });
    const [mediaItems, setMediaItems] = useState([]);



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


    useEffect(() => {
        // Extracting peopleId from URL
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeople_id(lastPart);
    }, []);


    // const handleFilter = async () => {
    //     fetchMediaItems();
    // };

    const fetchMediaItems = async () => {
        try {
            console.log('Fetching media items:', mediaTypes);
            const response = await axios.get(`${BASE_URL}/dashboard/get_fav`, {
                params: {
                    user_id: people_id,
                    mediaTypes: mediaTypes,
                    pageNumber: currentPage,
                }
            });
            setMediaItems(response.data);
        } catch (error) {
            console.error('Error fetching media items:', error);
        }
    };




    useEffect(() => {
        if (people_id) {
            fetchFavoriteItems();
            fetchFavoriteGenresData();
            fetchMediaItems();
        }
    }, [people_id, currentPage, mediaTypes]);

    const fetchFavoriteItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/favorites/media_type`);
            setFavoriteItems(response.data);
        } catch (error) {
            console.error('Error fetching favorite items:', error);
        }
    };

    const fetchFavoriteGenresData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/fav_genres`);
            setFavoriteGenresData(response.data);
            console.log('Favorite genres:', response.data);
        } catch (error) {
            console.error('Error fetching favorite genres data:', error);
        }
    };

    const formatMediaType = (typeId) => {
        switch (typeId) {
            case 1:
                return 'Movie';
            case 2:
                return 'TV';
            case 4:
                return 'Manga';
            case 3:
                return 'Book';
            default:
                return '';
        }
    };

    const data = favoriteGenresData.map(item => ({
        name: item.name,
        count: item.count
    }));

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5733', '#33FF57'];
    return (
        <div className="favorite-list-container">
            <div className="favorite-list">
                {/* Bar Chart for Favorite Items */}
                <div >
                    <div className="chart-container">
                        <h2>Favorite Items</h2>
                        <BarChart
                            width={600}
                            height={400}
                            data={favoriteItems}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type_id" tickFormatter={formatMediaType} stroke="#fff" tick={{ fill: '#fff', fontSize: 18 }} />
                            <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 18 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" /> {/* Customize bar color */}
                        </BarChart>
                    </div>
                    {/* Pie Chart for Favorite Genres */}
                    <div className="chart-container">
                        <h2>Favorite Genres</h2>
                        <ResponsiveContainer width={800} height={800}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="45%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, count }) => `${name}: ${count}`}
                                    outerRadius={250} // Increase the outer radius for a bigger circle
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))
                                    }
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                <div>

                    <div className='fav-filter-container'>
                        <div className="fav-mediaType-container">
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
                            {/* <div className='filter-button-div'>
                                <button type="submit" className="filter-button" onClick={() => handleFilter()}>Filter Results</button>
                            </div> */}
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
                </div>
            </div>
        </div>
    );
};

export default FavoriteList;
