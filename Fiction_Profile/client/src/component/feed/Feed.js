import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css'; // Import your CSS file for styling

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';
import BASE_URL from '../../config/ApiConfig';
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [followedUsers, setFollowedUsers] = useState([]); // State for storing followed users
    const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

    const people_id = localStorage.getItem('people_id');

    useEffect(() => {
        // Fetch feed data from the backend API
        const fetchFeedData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/feed`, {
                    params: {
                        user_id: people_id
                    }
                });

                // Handle response data here               
                setFeed(response.data.feed); // Extract 'feed' from response data
                console.log('Feed data:', response.data.feed);
                const followedResponse = await axios.get(`${BASE_URL}/feed/followed`, {
                    params: {
                        user_id: people_id
                    }
                });
                setFollowedUsers(followedResponse.data.followedUsers);

                const peopleYouMayKnowResponse = await axios.get(`${BASE_URL}/feed/people-you-may-know`, {
                    params: {
                        user_id: people_id
                    }
                });
                setPeopleYouMayKnow(peopleYouMayKnowResponse.data.peopleYouMayKnow);

            } catch (error) {
                console.error('Error fetching feed data:', error);
            }
        };

        fetchFeedData();
    }, [people_id]); // Fetch feed data when 'people_id' changes


    const handleFollow = async (followedUserId) => {
        try {
            // Send a request to the backend to follow the user
            await axios.post(`${BASE_URL}/feed/follow`, {
                user_id: people_id,
                followed_id: followedUserId
            });

            // Update the list of followed users or refetch the data
            // For example, you can refetch the data to update the followed users list
            const followedResponse = await axios.get(`${BASE_URL}/feed/followed                             `, {
                params: {
                    user_id: people_id
                }
            });
            setFollowedUsers(followedResponse.data.followedUsers);

            // You may also want to update the list of people you may know after following
            const peopleYouMayKnowResponse = await axios.get(`${BASE_URL}/feed/people-you-may-know`, {
                params: {
                    user_id: people_id
                }
            });
            setPeopleYouMayKnow(peopleYouMayKnowResponse.data.peopleYouMayKnow);
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async (followedId) => {
        try {
            // Send the unfollow action to the server
            await axios.post(`${BASE_URL}/feed/unfollow`, {
                user_id: people_id,
                followed_id: followedId
            });

            // Refresh the list of followed users
            const followedResponse = await axios.get(`${BASE_URL}/feed/followed`, {
                params: {
                    user_id: people_id
                }
            });
            setFollowedUsers(followedResponse.data.followedUsers);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };


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
                    user_id: people_id
                }
            });
            setFeed(response.data.feed);
            toast.success('Post published successfully!');
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
                    user_id: people_id
                }
            });
            setFeed(response.data.feed);
            toast.success('Comment published successfully!');

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
                            <p><img src={post.profile_pic_path} alt={post.post_id} />{post.username}</p>
                            <p>#{post.content}</p>
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
                {/* Followed Users Section */}
                <div className='followed-users-container'>
                    <div className="followed-users-list">
                        <h2>Followed Users</h2>

                        {followedUsers.map(following => (
                            <li key={following.follow_id}>
                                <div className="user-info">
                                    <img src={following.profile_pic_path} alt={following.full_name} />
                                    <span>{following.username}</span>
                                </div>
                                <button className="unfollow-button" onClick={() => handleUnfollow(following.followed_id)}>Unfollow</button>
                            </li>
                        ))}

                    </div>
                    <div className="people-you-may-know">
                        <h2>People You May Know</h2>
                        {peopleYouMayKnow.map(person => (
                            <li key={person.people_id}>
                                <div className="user-info">
                                    <img src={person.profile_pic_path} alt={`${person.first_name} ${person.last_name}`} />
                                    <span>{`${person.username}`}</span>
                                </div>
                                <button className="follow-button" onClick={() => handleFollow(person.people_id)}>Follow</button>
                            </li>
                        ))}
                    </div>
                    {/* <div className="trending-posts">
                        <h2>Trending Posts</h2>
                    </div> */}
                </div>

            </div >



            <Navbar />
        </>
    );
};

export default Feed;
