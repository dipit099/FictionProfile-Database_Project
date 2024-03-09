import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Moderator.css';
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import BarChartComponent from './BarChartComponent'; // Import the BarChartComponent component

const Moderator = () => {
    const [barReports, setBarReports] = useState([]);
    const [actionList, setActionList] = useState([]);
    const people_id = localStorage.getItem("people_id");

    const getReports = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/moderator/get_mod_stats`, {
                moderatorId: people_id
            });

            const data = response.data;
            setBarReports(data);
        } catch (error) {
            console.error("Error getting moderator stats:", error);
        }
    }

    const getActionList = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/moderator/get_action_list`, {
                moderatorId: people_id
            });

            const data = response.data;
            setActionList(data);
        } catch (error) {
            console.error("Error getting action list:", error);
        }
    }

    useEffect(() => {
        getReports();
        getActionList();
    }, []);


    const getTypeName = (typeId) => {
        switch (typeId) {
            case 1:
                return 'Movie';
            case 2:
                return 'TV';
            case 3:
                return 'Book';
            case 4:
                return 'Manga';
            default:
                return 'Unknown';
        }
    }

    return (
        <div className="moderatorhome-container">
            <SideBar />
            <div className="bar-charts">
                {barReports.map((report, index) => (
                    <BarChartComponent
                        key={index}
                        type_id={report.type}
                        insertCount={report.insert_count}
                        updateCount={report.update_count}
                        deleteCount={report.delete_count}
                    />
                ))}
            </div>
            <div className="moderatorhome-footer">
                <div className='mod-action-list'>
                    <h2>Action List</h2>
                    <div className='action-list-container'>
                        <ul className='action-list'>
                            {actionList.map((action, index) => (
                                <li key={index}>
                                    <strong>Action:</strong> {action.log_id}
                                    <strong>Type:</strong> {getTypeName(action.type_id)}<br />
                                    <strong>MedaId:</strong> {action.media_id}
                                    <strong>Title:</strong> {action.title}<br />
                                    <strong>Status:</strong> {action.operation_type}<br />
                                    <strong>Date:</strong> {new Date(action.created_at).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='mod-report'>


                </div>
            </div>
        </div>
    );
};

export default Moderator;
