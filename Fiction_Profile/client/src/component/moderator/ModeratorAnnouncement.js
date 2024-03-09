import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModeratorAnnouncement.css'; // Import your CSS file for styling
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar'; // Import statements...
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModeratorAnnouncement = () => {
  const [moderatorId, setModeratorId] = useState(localStorage.getItem('people_id'));
  const [announcement, setAnnouncement] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/moderator/announcement`, {
        params: { moderatorId: moderatorId }
      });
      setAnnouncement(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const addAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/moderator/announcement`, { 
        moderatorId: moderatorId, 
        title : title, 
        description : description
      });
      toast.success('Announcement added successfully');
      fetchAnnouncements();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  return (
    <div className="moderatorannounce-container">
      <SideBar />
      <Navbar />
      <div className="moderatorannounce-content">
        <div className="announcements">
          <h1>Past Announcements</h1>
          {announcement.map((announce) => (
            <div key={announce.id} className="announcement-item">
              <h3>{announce.title}</h3>
              <p>{announce.description}</p>
              <p>Created Date: {announce.created_at}</p>
            </div>
          ))}
        </div>
        <div className="add-announcement">
          <h1>Create New Announcement</h1>
          <form onSubmit={addAnnouncement}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Announcement</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorAnnouncement;
