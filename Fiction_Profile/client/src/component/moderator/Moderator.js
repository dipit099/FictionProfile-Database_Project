import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Moderator.css';
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import BarChartComponent from './BarChartComponent'; // Import the BarChartComponent component

const Moderator = () => {
    const [barReports, setBarReports] = useState({});
    const people_id = localStorage.getItem("people_id");

    const getReports = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/moderator/get_mod_stats`, {
                moderatorId: people_id
            });

            const data = response.data;
            const groupedData = data.reduce((acc, item) => {
                const { type_id, insert_count, update_count, delete_count } = item;
                if (!acc[type_id]) {
                    acc[type_id] = {
                        insertCount: 0,
                        updateCount: 0,
                        deleteCount: 0
                    };
                }
                acc[type_id].insertCount += insert_count;
                acc[type_id].updateCount += update_count;
                acc[type_id].deleteCount += delete_count;
                return acc;
            }, {});

            setBarReports(groupedData);
        } catch (error) {
            console.error("Error getting moderator stats:", error);
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    return (
        <div className="moderator-container">
            <SideBar />
            <div className="bar-charts">
                {Object.entries(barReports).map(([type_id, barData]) => (
                    <BarChartComponent
                        key={type_id}
                        type_id={type_id}
                        insertCount={barData.insertCount}
                        updateCount={barData.updateCount}
                        deleteCount={barData.deleteCount}
                    />
                ))}
            </div>
        </div>
    );
};

export default Moderator;