import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Modal from 'react-modal';
import BASE_URL from '../../config/ApiConfig';
import axios from 'axios';



const Admin = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [userIndex, setUserIndex] = useState(0);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/api/users`)
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    const openModal = (index) => {
        setUser(users[index]);
        setUserIndex(index);
        setSliderValue(users[index].score);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };
    
    const handleSliderChange = (value) => {
        setSliderValue(value);
    };
    
    const handleSave = () => {
        const updatedUsers = [...users];
        updatedUsers[userIndex].score = sliderValue;
        setUsers(updatedUsers);
        axios.put(`${BASE_URL}/api/users/${user._id}`, { score: sliderValue })
        .then(() => {
            toast.success('User score updated successfully');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to update user score');
        });
        setModalIsOpen(false);
    };
    
    return (
        <div className="admin">
        <h1>Admin</h1>
        </div>
    );
}


export default Admin;










