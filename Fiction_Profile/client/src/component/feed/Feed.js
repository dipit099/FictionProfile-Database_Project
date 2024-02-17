import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css'; // Import your CSS file for styling
import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';
import BASE_URL from '../../config/ApiConfig';
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const people_id = localStorage.getItem('people_id');

    useEffect(() => {
        // Fetch feed data from the backend API
        const fetchFeedData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/feed`, {
                    params: {
                        people_id: people_id
                    }
                });

                // Handle response data here               
                setFeed(response.data.feed); // Extract 'feed' from response data
                console.log('Feed data:', response.data.feed);
            } catch (error) {
                console.error('Error fetching feed data:', error);
            }
        };

        fetchFeedData();
    }, [people_id]); // Fetch feed data when 'people_id' changes

    const handlePostSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send the new post content to the server
            await axios.post(`${BASE_URL}/feed/post`, {
                user_id: people_id,
                content: newPostContent
            });

            // Refresh the feed data after posting
            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    people_id: people_id
                }
            });
            setFeed(response.data.feed);

            // Clear the input field after posting
            setNewPostContent('');
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    const handleCommentSubmit = async (postId, event) => {
        event.preventDefault();

        try {
            // Send the new comment content to the server
            await axios.post(`${BASE_URL}/feed/comment`, {
                user_id: people_id,
                post_id: postId,
                content: newCommentContent
            });

            // Refresh the feed data after commenting
            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    people_id: people_id
                }
            });
            setFeed(response.data.feed);

            // Clear the input field after commenting
            setNewCommentContent('');
        } catch (error) {
            console.error('Error commenting:', error);
        }
    };

    const handleUpvote = async (postId) => {
        try {
            // Send the upvote action to the server
            await axios.post(`${BASE_URL}/feed/upvote`, {
                user_id: people_id,
                post_id: postId
            });

            // Refresh the feed data after upvoting
            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    people_id: people_id
                }
            });
            setFeed(response.data.feed);
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    const handleDownvote = async (postId) => {
        try {
            // Send the downvote action to the server
            await axios.post(`${BASE_URL}/feed/downvote`, {
                user_id: people_id,
                post_id: postId
            });

            // Refresh the feed data after downvoting
            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    people_id: people_id
                }
            });
            setFeed(response.data.feed);
        } catch (error) {
            console.error('Error downvoting:', error);
        }
    };

    return (
        <>
            <SideBar />
            <div className='feed-container'>
                <div className='feedWrapper'>
                    <div>#Posts</div>

                    {/* Form to write and submit a new post */}
                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Write your post here..."
                            required
                        ></textarea>
                        <button type="submit">Publish Post</button>
                    </form>

                    {/* Display existing posts */}
                    {feed.map(post => (
                        <div key={post.post_id} className='post'>
                            <p>{post.content}</p>
                            {/* Upvote and Downvote buttons */}
                            <div className='upvote-container'>
                                <div onClick={() => handleUpvote(post.post_id)} className="vote-icon">
                                    <BiSolidUpvote size={30} />
                                </div>
                                <div onClick={() => handleDownvote(post.post_id)} className="vote-icon">
                                    <BiSolidDownvote size={30} />
                                </div>

                            </div>
                            {/* Form to write and submit a new comment */}
                            <form onSubmit={(event) => handleCommentSubmit(post.post_id, event)}>
                                <input
                                    type="text"
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                    placeholder="Write your comment here..."
                                    required
                                />
                                <button type="submit">Comment</button>
                            </form>
                            <p>Comments:</p>
                            <div className='comments'>
                                {post.comments.map(comment => (
                                    <div key={comment.comment_id} className='comment'>
                                        <p>{comment.content}</p>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Navbar />
        </>
    );
};

export default Feed;
