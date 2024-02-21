import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import BASE_URL from '../../config/ApiConfig';

const FavoriteList = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const people_id = localStorage.getItem('people_id');

    useEffect(() => {
        // Fetch favorite items from the server when the component mounts
        fetchFavoriteItems();
    }, []);

    const fetchFavoriteItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/favorites`);
            setFavoriteItems(response.data);
        } catch (error) {
            console.error('Error fetching favorite items:', error);
        }
    };

    return (
        <div>
            <h2 style={{ color: 'white' }}>Favorite List</h2>
            {/* Render favorite items here */}
        </div>
    );
};

export default FavoriteList;
