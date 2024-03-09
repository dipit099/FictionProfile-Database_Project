import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BASE_URL from '../../config/ApiConfig';
import './Affinity.css';

const Affinity = ({ people_id }) => {
    const [favoriteCountData, setFavoriteCountData] = useState([]);

    useEffect(() => {
        const fetchFavoriteCount = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/affinity/favorite_count`, {
                    params: {
                        my_id: localStorage.getItem('people_id'),
                        people_id: people_id,
                    }
                });
                const affinityData = response.data;
                const transformedData = transformAffinityData(affinityData);
                setFavoriteCountData(transformedData);
            } catch (error) {
                console.error('Error fetching favorite count:', error);
            }
        };
        fetchFavoriteCount();
    }, [people_id]);

    const transformAffinityData = (affinityData) => {
        const userData1 = affinityData.filter((item) => item.user_id === 4);
        const userData2 = affinityData.filter((item) => item.user_id === 5);

        const transformedData = [];

        userData1.forEach((item) => {
            const existingData = transformedData.find((data) => data.typeId === item.type_id);
            if (existingData) {
                existingData.user1Count = item.count;
                existingData.user1Username = item.username;
            } else {
                transformedData.push({
                    typeId: item.type_id,
                    user1Count: item.count,
                    user1Username: item.username,
                    user2Count: 0,
                    user2Username: '',
                });
            }
        });

        userData2.forEach((item) => {
            const existingData = transformedData.find((data) => data.typeId === item.type_id);
            if (existingData) {
                existingData.user2Count = item.count;
                existingData.user2Username = item.username;
            } else {
                transformedData.push({
                    typeId: item.type_id,
                    user1Count: 0,
                    user1Username: '',
                    user2Count: item.count,
                    user2Username: item.username,
                });
            }
        });

        return transformedData;
    };

    return (
        <div className='affinity-container' >
            <div>
                <BarChart
                    width={1200}
                    height={600}
                    data={favoriteCountData}
                    margin={{
                        top: 20,
                        right: 50,
                        left: 50,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="typeId"
                        tickFormatter={(typeId) =>
                            `${favoriteCountData.find((data) => data.typeId === typeId)?.user1Username || ''} vs ${favoriteCountData.find((data) => data.typeId === typeId)?.user2Username || ''
                            }`
                        }
                        style={{
                            fontSize: '20px',
                            fill: 'white',
                        }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="user1Count" fill="#8884d8" />
                    <Bar dataKey="user2Count" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>

    );
};

export default Affinity;