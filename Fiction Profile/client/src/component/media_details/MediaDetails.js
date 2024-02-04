// MediaDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MediaDetails.css';
import BASE_URL from "../../config/ApiConfig";

const MediaDetails = ({ mediaType }) => {
    const { id } = useParams(); // Extract id from the URL
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('Media Type:', mediaType);
        const fetchMediaDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${mediaType}/${id}`);
                const data = await response.json();
                setMedia(data.media);
            } catch (error) {
                console.error('Error fetching media details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaDetails();
    }, [id, mediaType]);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>; // Enhance loading state
    }

    if (!media) {
        return <div>No media details found.</div>; // Handle error state
    }

    return (
        <div className={`MediaDetails-container`}>
            <div className="backdrop" style={{ backgroundImage: `url('${media.backdrop_path}')` }}></div>

            <div className={`media-details-start-div`}>
                <div className={`media-details-info-div`}>
                    <div className="details">
                        <img className="poster" src={media.poster_path} alt={media.title} />

                    </div>
                    <div className="info">
                        <h2>Title: {media.title}</h2>
                        <h2>Vote Average: {media.vote_average}</h2>
                        <h2>Original language: {media.original_language}</h2>
                        <h2>Genres: {media.genres}</h2>
                        <h4>Overview: {media.overview}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MovieDetails = () => {
    return <MediaDetails mediaType="movie" />;
};
const TvshowDetails = () => {
    return <MediaDetails mediaType="tvshow" />;
};
const MangaDetails = () => {
    return <MediaDetails mediaType="manga" />;
};
const BookDetails = () => {
    return <MediaDetails mediaType="book" />;
};
export { MediaDetails, MovieDetails, TvshowDetails, MangaDetails, BookDetails };

