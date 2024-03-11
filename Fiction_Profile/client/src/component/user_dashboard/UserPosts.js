import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/ApiConfig';
import './UserPosts.css'; // Import CSS file for styling
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [showComments, setShowComments] = useState({}); // State to track visibility of comments

    const [modalOpen, setModalOpen] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [postIdBeingEdited, setPostIdBeingEdited] = useState(null);

    const openModal = (postId, content, title) => {
        setPostIdBeingEdited(postId);
        setEditedTitle(title);
        setEditedContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setPostIdBeingEdited(null);
        setEditedTitle('');
        setEditedContent('');
        setModalOpen(false);
    };



    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const [people_id, setPeople_id] = useState(''); // Initially set to 1
    useEffect(() => {
        // Extracting peopleId from URL
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeople_id(lastPart);
    }, []);

    useEffect(() => {
        if (people_id) {
            fetchUserPosts();
        }
    }, [people_id]);


    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${people_id}/posts`);
            setUserPosts(response.data.feed); // Assuming the feed data is structured properly
            // Initialize showComments state based on the number of posts
            const initialCommentsState = {};
            response.data.feed.forEach(post => {
                initialCommentsState[post.post_id] = false;
            });
            setShowComments(initialCommentsState);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const toggleComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    const handleEditPost = async () => {
        // Perform editing logic here
        try {
            console.log(`Editing post with ID ${postIdBeingEdited} with content: ${editedContent}`);
            const response = await axios.post(`${BASE_URL}/dashboard/edit_post`, {
                post_id: postIdBeingEdited,
                title: editedTitle,
                content: editedContent,
                userId: people_id
            });

            closeModal();
            toast ('Post Edited Successfully');
        }
        catch (error) {
            console.error('Error editing post:', error);
        }

    };

    const handleDeletePost = async () => {
        // Perform deletion logic here
        try {
            console.log(`Deleting post with ID ${postIdBeingEdited}`);
            const response = await axios.post(`${BASE_URL}/dashboard/delete_post`, {
                post_id: postIdBeingEdited,
                userId: people_id
            });

            closeModal();
            toast ('Post Deleted Successfully');
        }
        catch (error) {
            console.error('Error deleting post:', error);
        }

    };



    return (
        <div className="user-posts-container">
            <h2>User Posts</h2>
            {userPosts.map(post => (
                <div className="post" key={post.post_id}>
                    <h2 className="post-title">
                        Title: {post.title} --- 
                        {formatDate(post.last_edit)}
                        <span><button onClick={() => openModal(post.post_id, post.content, post.title)}>Edit</button>

                        </span>
                    </h2>


                    <p className="post-content">Content: {post.content}</p>

                    <button onClick={() => toggleComments(post.post_id)}>
                        {showComments[post.post_id] ? 'Hide Comments' : 'Show Comments'}
                    </button>

                    {showComments[post.post_id] && (
                        <ul className="comments-list">
                            {post.comments.map(comment => (
                                <li className="comment" key={comment.comment_id}>{comment.content}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
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
                        width: '800px',
                        height: '800px',
                        margin: 'auto',
                        backgroundColor: '#1a2032', // Transparent background for the modal content
                        border: 'none', // Remove border if needed
                        boxShadow: 'none', // Remove box shadow if needed

                    },
                }}
            >
                <div className="editpost-modal">
                    <h2>Edit Post</h2>
                    <div className="form-group">
                        <label htmlFor="title" className="label">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content" className="label">Content:</label>
                        <textarea
                            value={editedContent}
                            onChange={handleContentChange}
                            rows={4}
                            cols={50}
                            className="textarea"
                        />
                    </div>
                    <div className="button-group">
                        <button onClick={handleEditPost} className="save-button">Save Changes</button>
                        <button onClick={handleDeletePost} className="save-button">Delete</button>
                        <button onClick={closeModal} className="cancel-button">Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserPosts;
