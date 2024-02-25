import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BASE_URL from '../../config/ApiConfig';

const Affinity = ({ people_id }) => {
    const [favorite_count, setFavoriteCount] = useState([]);

    useEffect(() => {
        const fetchFavoriteCount = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/affinity/favorite_count`, {
                    params: {
                        my_id: localStorage.getItem('people_id'),
                        people_id: people_id,
                    }
                });
                setFavoriteCount(response.data);
            } catch (error) {
                console.error('Error fetching favorite count:', error);
            }
        };
        fetchFavoriteCount();
    }, [people_id]);

    // Combine the affinity data of both users
    const combinedData = favorite_count.reduce((acc, curr) => {
        const existingData = acc.find(item => item.type_id === curr.type_id);
        if (existingData) {
            existingData[`user_${curr.user_id}`] = parseInt(curr.count);
        } else {
            acc.push({
                type_id: curr.type_id,
                [`user_${curr.user_id}`]: parseInt(curr.count),
            });
        }
        return acc;
    }, []);

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
        <div className='affinity-container'>
            <h2>Affinity</h2>
            <BarChart
                width={800}
                height={400}
                data={combinedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type_id" tickFormatter={formatMediaType} stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
                <YAxis stroke="#fff" tick={{ fill: '#fff', fontSize: 20 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="user_4" fill="#8884d8" name={`Mine`} />
                <Bar dataKey="user_14" fill="#82ca9d" name={`Others`} />
            </BarChart>
        </div>
    );
};

export default Affinity;
