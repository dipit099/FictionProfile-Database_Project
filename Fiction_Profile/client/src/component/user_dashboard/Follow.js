import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from "../../config/ApiConfig";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Follow.css';

const Follow = () => {

    const people_id = localStorage.getItem('people_id');

    const [followed, setFollowed] = useState([]);
    const [follower, setFollower] = useState([]);
    const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

    const fetchFollowing = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feed/followed`, {
                params: {
                    user_id: people_id
                }
            });
            setFollowed(response.data.followedUsers);
            console.log(followed);
        }
        catch (error) {
            console.error('Error fetching following:', error);
        }
    }

    const fetchFollowers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feed/follower`, {
                params: {
                    user_id: people_id
                }
            });
            setFollower(response.data.followerUsers);
            console.log(follower);

        }
        catch (error) {
            console.error('Error fetching followers:', error);
        }
    }


    const fetchPeopleYouMayKnow = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feed/people-you-may-know`, {
                params: {
                    user_id: people_id
                }
            });
            setPeopleYouMayKnow(response.data.peopleYouMayKnow);
            console.log(peopleYouMayKnow);
        }
        catch (error) {
            console.error('Error fetching people you may know:', error);
        }
    }

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
        fetchPeopleYouMayKnow();
    }
        , [people_id]);


    const handleFollow = async (followedUserId) => {
        try {
            await axios.post(`${BASE_URL}/feed/follow`, {
                user_id: people_id,
                followed_id: followedUserId
            });

            fetchFollowers();
            fetchFollowing();


        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnFollow = async (followedUserId) => {
        try {
            await axios.post(`${BASE_URL}/feed/unfollow`, {
                user_id: people_id,
                followed_id: followedUserId
            });

            fetchFollowers();
            fetchFollowing();

        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div className="follow-network">

            <div className="followed">
                <h3>Following</h3>
                {followed.map(followed => (
                    <div className="user-info">
                        <li key={followed.people_id}>
                            <Link to={`/dashboard/${followed.followed_id}`} target="_blank">
                                <img src={followed.profile_pic_path} alt={`${followed.first_name} ${followed.last_name}`} />
                                <span>{`${followed.username}`}</span>
                            </Link>

                            <button className="profile-follow-button" onClick={() => handleUnFollow(followed.followed_id)}>Unfollow</button>
                        </li>

                    </div>
                ))}
            </div>
            <div className="followers">
                <h3>Followers</h3>
                {follower.map(follower => (
                    <div className="user-info">
                        <li key={follower.people_id}>
                            <Link to={`/dashboard/${follower.follower_id}`} target="_blank">
                                <img src={follower.profile_pic_path} alt={`${follower.first_name} ${follower.last_name}`} />
                                <span>{`${follower.username}`}</span>
                            </Link>
                        </li>
                    </div>
                ))}
            </div>


            <div className="people-you-may-know">
                <h3>Same Minds</h3>
                {peopleYouMayKnow.map(peopleYouMayKnow => (
                    < div className="user-info">
                        <li key={peopleYouMayKnow.people_id}>
                            <Link to={`/dashboard/${peopleYouMayKnow.people_id}`} target="_blank">
                                <img src={peopleYouMayKnow.profile_pic_path} alt={`${peopleYouMayKnow.first_name} ${peopleYouMayKnow.last_name}`} />
                                <span>{`${peopleYouMayKnow.username}`}</span>
                            </Link>


                            <button className="profile-follow-button" onClick={() => handleFollow(peopleYouMayKnow.people_id)}>Follow</button>
                        </li>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Follow;
