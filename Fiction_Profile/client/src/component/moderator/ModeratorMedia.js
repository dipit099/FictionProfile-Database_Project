import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ModeratorMedia.css'; // Import your CSS file for styling
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';

const Moderator = () => {
    // State variables
    const [modalOpen, setModalOpen] = useState(false);
    const [mediaType, setMediaType] = useState('');
    const [mediaDetails, setMediaDetails] = useState({
        title: '',
        year: '',
        authorDirectorWriter: '',
        language: '',
        genre: [],
        runtime: '', // Only for movie and TV
    });
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [posterImage, setPosterImage] = useState(null);
    const [backdropImage, setBackdropImage] = useState(null);

    // Function to open the modal for adding media
    const openModal = () => {
        setModalOpen(true);
        console.log('Modal opened');
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to handle changes in media details form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMediaDetails({ ...mediaDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'posterImage') {
            setPosterImage(files[0]);
        } else if (name === 'backdropImage') {
            setBackdropImage(files[0]);
        }
    };


    // Function to handle genre selection
    const handleGenreChange = (e) => {
        const { value } = e.target;
        setMediaDetails({ ...mediaDetails, genre: value });
    };

    // Function to add a new genre
    const addNewGenre = () => {
        // Add the new genre to the genre list
        setGenres([...genres, newGenre]);
        // Add the new genre to the selected genre list
        setMediaDetails({ ...mediaDetails, genre: [...mediaDetails.genre, newGenre] });
    };

    // Function to submit media details to the backend
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('type', mediaType);
            formData.append('title', mediaDetails.title);
            formData.append('year', mediaDetails.year);
            formData.append('authorDirectorWriter', mediaDetails.authorDirectorWriter);
            formData.append('language', mediaDetails.language);
            formData.append('genre', mediaDetails.genre);
            if (posterImage) {
                formData.append('posterImage', posterImage);
            }
            if (backdropImage) {
                formData.append('backdropImage', backdropImage);
            }
            if (mediaType === 'movie' || mediaType === 'tv') {
                formData.append('runtime', mediaDetails.runtime);
            }
    
            const response = await axios.post(`${BASE_URL}/moderator/add-media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Media added successfully:', response.data);
            closeModal();
        } catch (error) {
            console.error('Error adding media:', error);
        }
    };


    useEffect(() => {
        const fetchMediaGenres = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/discover/genre`);
                const data = response.data;
                console.log('Genre List:', data);
                setGenres(data.genres); // Update the state with the received genre list
            } catch (error) {
                console.error('Error fetching genre list:', error);
            }
        };

        fetchMediaGenres();
    }, []);

    return (
        <>
        <Navbar />
        <SideBar />
        <div className="moderator-container">
            <div className="add-media-container">
                <button className="add-media-button" onClick={openModal}>
                    <span className="plus-icon">+</span>
                    <span className="button-text">Add Media</span>
                </button>
            </div>
        </div>
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            contentLabel='Popup Modal'
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                    backdropFilter: 'blur(2px)',
                },
                content: {
                    width: '600px',
                    height: '600px',
                    margin: 'auto',
                    backgroundColor: '#032641', // Transparent background for the modal content
                    border: 'none', // Remove border if needed
                    boxShadow: 'none', // Remove box shadow if needed
                },
            }}
        >   
            <h2 className="modal-title">Add Media</h2>
            <div className="form-group">
                <label htmlFor="mediaType">Type:</label>
                <select
                    id="mediaType"
                    name="mediaType"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    class="form-control"
                >
                    <option value="" class="form-text">Select type</option>
                    <option value="movie" class="form-text">Movie</option>
                    <option value="tv" class="form-text">TV</option>
                    <option value="book" class="form-text">Book</option>
                    <option value="manga" class="form-text">Manga</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={mediaDetails.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input
                    type="text"
                    id="year"
                    name="year"
                    value={mediaDetails.year}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="authorDirectorWriter">Author/Director/Writer:</label>
                <input
                    type="text"
                    id="authorDirectorWriter"
                    name="authorDirectorWriter"
                    value={mediaDetails.authorDirectorWriter}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="language">Language:</label>
                <input
                    type="text"
                    id="language"
                    name="language"
                    value={mediaDetails.language}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <select
                    id="genre"
                    name="genre"
                    value={mediaDetails.genre}
                    onChange={handleGenreChange}
                    multiple
                >
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    id="newGenre"
                    name="newGenre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                />
                <button onClick={addNewGenre}>Add New Genre</button>
            </div>
            <div className="form-group">
                <label htmlFor="posterImage">Poster Image:</label>
                <input
                    type="file"
                    id="posterImage"
                    name="posterImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="backdropImage">Backdrop Image:</label>
                <input
                    type="file"
                    id="backdropImage"
                    name="backdropImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            {mediaType === 'movie' || mediaType === 'tv' && (
                <div className="form-group">
                    <label htmlFor="runtime">Runtime:</label>
                    <input
                        type="text"
                        id="runtime"
                        name="runtime"
                        value={mediaDetails.runtime}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div className="button-group">
                <button className="cancel-button" onClick={closeModal}>
                    Cancel
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </Modal>
        </>
    );
};

export default Moderator;
