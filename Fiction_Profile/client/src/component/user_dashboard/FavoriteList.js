import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
import BASE_URL from '../../config/ApiConfig';
import './FavoriteList.css'; // Import CSS file for styling

const FavoriteList = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [favoriteGenresData, setFavoriteGenresData] = useState([]);
    const [people_id, setPeople_id] = useState(''); // Initially set to 1
    useEffect(() => {
        // Extracting peopleId from URL
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeople_id(lastPart);
    }, []);


    useEffect(() => {
        if (people_id) {
            fetchFavoriteItems();
            fetchFavoriteGenresData();
        }
    }, [people_id]);

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
            case 3:
                return 'Manga';
            case 4:
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
                {/* Pie Chart for Favorite Genres */}
                <div className="chart-container">
                    <h2>Favorite Genres</h2>
                    <ResponsiveContainer width={800} height={800}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, count }) => `${name}: ${count}`}
                                outerRadius={300} // Increase the outer radius for a bigger circle
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
        </div>
    );
};

export default FavoriteList;
