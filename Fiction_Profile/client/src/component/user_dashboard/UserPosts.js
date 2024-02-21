import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/ApiConfig';
import './UserPosts.css'; // Import CSS file for styling

const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [showComments, setShowComments] = useState({}); // State to track visibility of comments

    const people_id = localStorage.getItem('people_id');

    useEffect(() => {
        fetchUserPosts();
    }, []);

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

    return (
        <div className="user-posts-container">
            <h2>User Posts</h2>
            {userPosts.map(post => (
                <div className="post" key={post.post_id}>
                    <h3 className="post-title">
                        Title: {post.title} - {new Date(post.last_edit).toLocaleString()}
                    </h3>

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
        </div>
    );
};

export default UserPosts;
