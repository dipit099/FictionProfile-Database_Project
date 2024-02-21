import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css'; // Import your CSS file for styling

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';
import BASE_URL from '../../config/ApiConfig';
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCaption, setNewPostCaption] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [followedUsers, setFollowedUsers] = useState([]);
    const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

    const people_id = localStorage.getItem('people_id');

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/feed`, {
                    params: {
                        user_id: people_id
                    }
                });

                setFeed(response.data.feed);
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
    }, [people_id]);

    const handleFollow = async (followedUserId) => {
        try {
            await axios.post(`${BASE_URL}/feed/follow`, {
                user_id: people_id,
                followed_id: followedUserId
            });

            const followedResponse = await axios.get(`${BASE_URL}/feed/followed`, {
                params: {
                    user_id: people_id
                }
            });
            setFollowedUsers(followedResponse.data.followedUsers);
            toast.success('You are now following this user!');

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
            await axios.post(`${BASE_URL}/feed/unfollow`, {
                user_id: people_id,
                followed_id: followedId
            });

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

            toast.success('You have unfollowed this user!');
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };


    const handlePostSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/feed/post`, {
                user_id: people_id,
                content: newPostContent,
                caption: newPostCaption
            });

            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    user_id: people_id
                }
            });
            setFeed(response.data.feed);
            toast.success('Post published successfully!');
            setNewPostContent('');
            setNewPostCaption('');
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    const handleCommentSubmit = async (postId, event) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/feed/comment`, {
                user_id: people_id,
                post_id: postId,
                content: newCommentContent
            });

            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    user_id: people_id
                }
            });
            setFeed(response.data.feed);
            toast.success('Comment published successfully!');
            setNewCommentContent('');
        } catch (error) {
            console.error('Error commenting:', error);
        }
    };

    // const handleUpvote = async (postId) => {
    //     try {
    //         await axios.post(`${BASE_URL}/feed/upvote`, {
    //             user_id: people_id,
    //             post_id: postId
    //         });

    //         const response = await axios.get(`${BASE_URL}/feed`, {
    //             params: {
    //                 people_id: people_id
    //             }
    //         });
    //         setFeed(response.data.feed);
    //     } catch (error) {
    //         console.error('Error upvoting:', error);
    //     }
    // };

    // const handleDownvote = async (postId) => {
    //     try {
    //         await axios.post(`${BASE_URL}/feed/downvote`, {
    //             user_id: people_id,
    //             post_id: postId
    //         });

    //         const response = await axios.get(`${BASE_URL}/feed`, {
    //             params: {
    //                 people_id: people_id
    //             }
    //         });
    //         setFeed(response.data.feed);
    //     } catch (error) {
    //         console.error('Error downvoting:', error);
    //     }
    // };
    const handleUpvote = (postId) => {
        const updatedFeed = feed.map(post => {
            if (post.post_id === postId) {
                return {
                    ...post,
                    upvoted: !post.upvoted, // Toggle the upvoted state
                    downvoted: false // Ensure downvote state is false when upvoting
                };
            }
            return post;
        });
        setFeed(updatedFeed);
    };

    const handleDownvote = (postId) => {
        const updatedFeed = feed.map(post => {
            if (post.post_id === postId) {
                return {
                    ...post,
                    downvoted: !post.downvoted, // Toggle the downvoted state
                    upvoted: false // Ensure upvote state is false when downvoting
                };
            }
            return post;
        });
        setFeed(updatedFeed);
    };

    const [showComments, setShowComments] = useState({});

    const toggleComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId] // Toggles the showComments state for the specific post
        }));
    };



    const handleReport = async (postId) => {
        try {
            // Send a report request to the backend
            await axios.post(`${BASE_URL}/feed/report`, {
                user_id: people_id,
                post_id: postId
            });
            // Optionally, you can display a toast message or handle the UI accordingly
            toast.success('Post reported successfully!');
        } catch (error) {
            console.error('Error reporting post:', error);
        }
    };


    return (
        <>
            <SideBar />
            <div className='feed-container'>
                <div className='feedWrapper'>
                    <form onSubmit={handlePostSubmit}>
                        <input
                            type="text"
                            value={newPostCaption}
                            onChange={(e) => setNewPostCaption(e.target.value)}
                            placeholder="Write your caption here..."
                        ></input>
                        <br />
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Write your post here..."
                            required
                        ></textarea>

                        <button type="submit" className='publish-button'>Publish Post</button>
                    </form>

                    {feed.map(post => (
                        <div key={post.post_id} className='post'>
                            <p><img src={post.profile_pic_path} alt={post.post_id} />{post.username}</p>
                            <div className='post-title'>Title:  {post.title} ---------- {new Date(post.last_edit).toLocaleString()}
                                <button className="report-button" onClick={() => handleReport(post.post_id)}>Report</button>
                            </div>
                            <div className='post-description'>Content: {post.content}</div>
                            <div className='upvote-container'>
                                <div onClick={() => handleUpvote(post.post_id)} className="vote-icon">
                                    <FontAwesomeIcon icon={faThumbsUp} style={{ cursor: 'pointer', marginRight: '15px', fontSize: '30px', color: post.upvoted ? 'green' : 'white' }} />
                                </div>
                                <div onClick={() => handleDownvote(post.post_id)} className="vote-icon">
                                    <FontAwesomeIcon icon={faThumbsDown} style={{ cursor: 'pointer', marginRight: '15px', fontSize: '30px', color: post.downvoted ? 'red' : 'white' }} />
                                </div>
                            </div>
                            <div>
                                <button className='publish-button' onClick={() => toggleComments(post.post_id)}>Show/Hide Comments</button>

                            </div>
                            {showComments[post.post_id] && (
                                <>
                                    <form onSubmit={(event) => handleCommentSubmit(post.post_id, event)}>
                                        <input
                                            type="text"
                                            value={newCommentContent}
                                            onChange={(e) => setNewCommentContent(e.target.value)}
                                            placeholder="Write your comment here..."
                                            required
                                        />
                                        <button type="submit" className='publish-button'>Comment</button>
                                    </form>
                                    <p>Comments:</p>
                                    <div className='comments'>
                                        {post.comments.length > 0 ? (
                                            post.comments.map(comment => (
                                                <div key={comment.comment_id} className='comment'>
                                                    <p>{comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments up to now</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}


                </div>
                <div className='followed-users-container'>
                    <div className="followed-users-list">
                        <h2>Followed Users</h2>
                        {followedUsers.map(following => (
                            <div className="user-info">
                                <li key={following.follow_id}>

                                    <img src={following.profile_pic_path} alt={following.full_name} />
                                    <span>{following.username}</span>

                                    <button className="unfollow-button" onClick={() => handleUnfollow(following.followed_id)}>Unfollow</button>
                                </li>
                            </div>
                        ))}
                    </div>
                    <div className="people-you-may-know">
                        <h2>People You May Know</h2>

                        {peopleYouMayKnow.map(person => (
                            < div className="user-info">
                                <li key={person.people_id}>

                                    <img src={person.profile_pic_path} alt={`${person.first_name} ${person.last_name}`} />
                                    <span>{`${person.username}`}</span>

                                    <button className="follow-button" onClick={() => handleFollow(person.people_id)}>Follow</button>
                                </li>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            <Navbar />
        </>
    );
};

export default Feed;
