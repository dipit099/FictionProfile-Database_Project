import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css'; // Import your CSS file for styling

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';
import BASE_URL from '../../config/ApiConfig';

import UpvoteIcon from '../../assets/UpvoteIcon';
import DownvoteIcon from '../../assets/DownvoteIcon';
import CommentIcon from '../../assets/CommentIcon';

import { Link } from 'react-router-dom';

const Feed = () => {
    const [feed, setFeed] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCaption, setNewPostCaption] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [followedUsers, setFollowedUsers] = useState([]);
    const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

    const [trendingPosts, setTrendingPosts] = useState([]);
    const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState([]);

    // Function to open the modal and set the selected post
    const openTrendingModal = (post) => {
        setSelectedPost(post);
        console.log(post);
        setIsTrendingModalOpen(true);
    };

    // Function to close the modal
    const closeTrendingModal = () => {
        setIsTrendingModalOpen(false);
    };

    const people_id = localStorage.getItem('people_id');
    const fetchFeedData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feed`, {
                params: {
                    user_id: people_id
                }
            });

            setFeed(response.data.feed);

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

            // Extract the first 4 entries from the response data
            const firstFourPeople = peopleYouMayKnowResponse.data.peopleYouMayKnow.slice(0, 4);

            // Set the state with the first four entries
            setPeopleYouMayKnow(firstFourPeople);

        } catch (error) {
            console.error('Error fetching feed data:', error);
        }
    };



    const fetchTrendingPosts = async () => {
        try {
            // Make an HTTP POST request to your server endpoint
            const response = await axios.get(`${BASE_URL}/feed/trending_posts`);
            setTrendingPosts(response.data.feed);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching trending posts:', error);
            // Handle errors if needed
        }
    };


    useEffect(() => {

        fetchFeedData();
        fetchTrendingPosts();

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
            if (followedResponse.data.followedUsers.length > 0)
                setFollowedUsers(followedResponse.data.followedUsers);
            toast.success('You are now following this user!');

            const peopleYouMayKnowResponse = await axios.get(`${BASE_URL}/feed/people-you-may-know`, {
                params: {
                    user_id: people_id
                }
            });
            if (peopleYouMayKnowResponse.data.peopleYouMayKnow.length > 0) {
                const firstFourPeople = peopleYouMayKnowResponse.data.peopleYouMayKnow.slice(0, 4);

                // Set the state with the first four entries
                setPeopleYouMayKnow(firstFourPeople);
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    // const handleUnfollow = async (followedId) => {
    //     try {
    //         await axios.post(`${BASE_URL}/feed/unfollow`, {
    //             user_id: people_id,
    //             followed_id: followedId
    //         });

    //         const followedResponse = await axios.get(`${BASE_URL}/feed/followed`, {
    //             params: {
    //                 user_id: people_id
    //             }
    //         });
    //         setFollowedUsers(followedResponse.data.followedUsers);

    //         const peopleYouMayKnowResponse = await axios.get(`${BASE_URL}/feed/people-you-may-know`, {
    //             params: {
    //                 user_id: people_id
    //             }
    //         });
    //         setPeopleYouMayKnow(peopleYouMayKnowResponse.data.peopleYouMayKnow);

    //         toast.success('You have unfollowed this user!');
    //     } catch (error) {
    //         console.error('Error unfollowing user:', error);
    //     }
    // };


    const handlePostSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/feed/post`, {
                user_id: people_id,
                content: newPostContent,
                caption: newPostCaption
            });

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
            if (response.data.success)
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
    // const handleVote = async (postId, voteValue) => {
    //     // const updatedFeed = feed.map(post => {
    //     //     if (post.post_id === postId) {
    //     //         // Toggle the vote state based on voteValue
    //     //         const isUpvote = voteValue === 1;
    //     //         const isDownvote = voteValue === -1;

    //     //         // Toggle the upvoted state
    //     //         const updatedUpvoteState = isUpvote ? !post.upvoted : false;

    //     //         // Toggle the downvoted state
    //     //         const updatedDownvoteState = isDownvote ? !post.downvoted : false;

    //     //         return {
    //     //             ...post,
    //     //             upvoted: updatedUpvoteState,
    //     //             downvoted: updatedDownvoteState,
    //     //         };
    //     //     }
    //     //     return post;
    //     // });

    //     const response = await axios.post(`${BASE_URL}/feed/add_post_vote`, {
    //         user_id: people_id,
    //         post_id: postId,
    //         vote_value: voteValue
    //     });

    //     if (response.data.success) {
    //         // Proceed with the action since the response was successful
    //         toast.success('Voting successful!');
    //         const result = await axios.get(`${BASE_URL}/feed`, {
    //             params: {
    //                 user_id: people_id
    //             }
    //         });

    //         setFeed(result.data.feed);
    //     } else {
    //         // Handle the case where the response was not successful
    //         toast.error('Voting failed!');
    //     }



    //     // setFeed(updatedFeed);

    // };
    const handleVote = async (postId, voteValue) => {
        try {
            const response = await axios.post(`${BASE_URL}/feed/add_post_vote`, {
                user_id: people_id,
                post_id: postId,
                vote_value: voteValue
            });

            if (response.data.success) {
                // Proceed with the action since the response was successful
                toast.success('Voting successful!');
                const result = await axios.get(`${BASE_URL}/feed`, {
                    params: {
                        user_id: people_id
                    }
                });

                setFeed(result.data.feed); // Update the feed state with new data
            } else {
                // Handle the case where the response was not successful
                toast.error('Voting failed!');
            }
        } catch (error) {
            // Handle errors that occur during the HTTP request
            console.error('Error voting:', error);
            toast.error('An error occurred while voting');
        }
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


                    </form>
                    <button type="submit" className='publish-button'>Publish Post</button>

                    {feed.map(post => (
                        <div key={post.post_id} className='post'>
                            <p><img src={post.profile_pic_path} alt={post.post_id} />{post.username}</p>
                            <div className='post-title-div'>
                                <div className='post-title'>{post.title} </div>
                                <div className='feed-date'> {new Date(post.last_edit).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })} </div>



                            </div>
                            <div className='post-description'>{post.content}</div>
                            <div className='vote-container' >
                                <div className={`feedvote-container ${post.user_vote === 1 ? 'upvoted' : post.user_vote === -1 ? 'downvoted' : ''}`}>
                                    <div onClick={() => handleVote(post.post_id, 1)}>
                                        <UpvoteIcon filled={post.user_vote === 1} />
                                    </div>
                                    <div style={{ fontSize: '22px', marginLeft: '5px', marginRight: '5px' }}>{post.total_vote}</div>

                                    <div onClick={() => handleVote(post.post_id, -1)}>
                                        <DownvoteIcon filled={post.user_vote === -1} />
                                    </div>
                                </div>



                                <div onClick={() => toggleComments(post.post_id)} className='feedcommenttoggle-div'>
                                    <CommentIcon ></CommentIcon>
                                    <div style={{ marginLeft: '10px', fontSize: '20px' }}> {post.comments_count}  </div>
                                </div>
                                <div >
                                    <button className="report-button" onClick={() => handleReport(post.post_id)}>Report</button>
                                </div>


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
                                    <div className='comment-div'>
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
                <div className='trending-container'>
                    <div>
                        <h2>Trending Posts</h2>
                        <div className='trending-posts'>
                            {trendingPosts.map(post => (
                                <div key={post.post_id} className='post'>

                                    <div className='post-title-div'>
                                        <div className='post-username'>Username: {post.post_username}</div>
                                        <div className='post-td-div'>
                                            <div className='post-title'>Caption: {post.title}</div>
                                            <div className='feed-date'>{post.days_before}Days ago</div>
                                        </div>
                                    </div>
                                    <button className='trending-button' onClick={() => openTrendingModal(post)}>View Details</button>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='followed-users-container'>
                        {/* <div className="followed-users-list">
                            <h2>Followed Users</h2>
                            {followedUsers.map(followedUsers => (
                                <div className="user-info">
                                    <li key={followedUsers.follow_id}>
                                        <Link to={`/dashboard/${followedUsers.followed_id}`}>
                                            <img src={followedUsers.profile_pic_path} alt={followedUsers.full_name} />
                                            <span>{followedUsers.username}</span>
                                        </Link>

                                        <button className="unfollow-button" onClick={() => handleUnfollow(followedUsers.followed_id)}>Unfollow</button>
                                    </li>
                                </div>
                            ))}
                        </div> */}
                        <h2>Same Minds</h2>
                        <div className="people-you-may-know">


                            {peopleYouMayKnow.map(peopleYouMayKnow => (
                                < div className="user-info">
                                    <li key={peopleYouMayKnow.people_id}>
                                        <Link to={`/dashboard/${peopleYouMayKnow.people_id}`}>
                                            <img src={peopleYouMayKnow.profile_pic_path} alt={`${peopleYouMayKnow.first_name} ${peopleYouMayKnow.last_name}`} />
                                            <span>{`${peopleYouMayKnow.username}`}</span>
                                            <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold', color: '#928686' }}>{`(Mutual : ${peopleYouMayKnow.mutual_followers_count})`}</span>
                                        </Link>

                                        <button className="follow-button" onClick={() => handleFollow(peopleYouMayKnow.people_id)}>Follow</button>
                                    </li>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >


            <Navbar />

            <Modal
                isOpen={isTrendingModalOpen}
                onRequestClose={closeTrendingModal}
                contentLabel='Popup Modal'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                        backdropFilter: 'blur(2px)',

                    },
                    content: {
                        width: '800px',
                        height: '700px',
                        margin: 'auto',
                        backgroundColor: '#032641', // Transparent background for the modal content
                        border: 'none', // Remove border if needed
                        boxShadow: 'none', // Remove box shadow if needed

                    },
                }}
            >
                <div className="trending-modal-div">
                    <div className="trending-modal-content">
                        <h2>Post Details</h2>
                        <div className="close-icon" onClick={closeTrendingModal}>X</div>
                        <div>Username: {selectedPost.post_username}</div>
                        <div>Title: {selectedPost.title} </div>
                        <div>Days Before: {selectedPost.days_before}</div>
                        <div>Content: {selectedPost.content}</div>

                        <h3>Comments:</h3>
                        {selectedPost.comments && selectedPost.comments.map(comment => (
                            <div key={comment.comment_id}>
                                <div><strong>Username:</strong> {comment.comment_username}</div>
                                <div><strong>Comment:</strong> {comment.content}</div>
                            </div>
                        ))}
                    </div>
                </div>


            </Modal>
        </>
    );
};

export default Feed;
