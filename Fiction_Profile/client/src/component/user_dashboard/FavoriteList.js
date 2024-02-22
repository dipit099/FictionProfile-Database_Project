import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'; // Import necessary components
import BASE_URL from '../../config/ApiConfig';
import './FavoriteList.css'; // Import CSS file for styling

const FavoriteList = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [favoriteGenresData, setFavoriteGenresData] = useState([]);

    useEffect(() => {
        fetchFavoriteItems();
        fetchFavoriteGenresData();
    }, []);

    const fetchFavoriteItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${localStorage.getItem('people_id')}/favorites`);
            setFavoriteItems(response.data);
        } catch (error) {
            console.error('Error fetching favorite items:', error);
        }
    };

    const fetchFavoriteGenresData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${localStorage.getItem('people_id')}/fav_genres`);
            setFavoriteGenresData(response.data);
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
            case 3:
                return 'Manga';
            case 4:
                return 'Book';
            default:
                return '';
        }
    };

    return (
        <div className="favorite-list-container">
            <div className="favorite-list">
                {/* Bar Chart for Favorite Items */}
                <div className="chart-container">
                    <h2>Favorite Items</h2>
                    <BarChart
                        width={600}
                        height={400}
                        data={favoriteItems}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type_id" tickFormatter={formatMediaType} stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
                        <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" /> {/* Customize bar color */}
                    </BarChart>
                </div>
                {/* Radar Chart for Favorite Genres */}
                <div className="chart-container">
                    <h2>Favorite Genres</h2>
                    <RadarChart outerRadius={150} width={600} height={400} data={favoriteGenresData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="genre_name" stroke="#fff" />
                        <PolarRadiusAxis stroke="#fff" />
                        <Radar name="Count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                </div>
            </div>
        </div>
    );
};

export default FavoriteList;
