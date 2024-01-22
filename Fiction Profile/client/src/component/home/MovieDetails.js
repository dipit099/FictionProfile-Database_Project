// MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; // Import the CSS file

const MovieDetails = () => {
    const { id } = useParams(); // Extract id from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5197/movie/${id}`);
                const data = await response.json();
                setMovie(data.movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="MovieDetails-container">
            <div className="backdrop" style={{ backgroundImage: `url('${movie.backdrop_path}')` }}></div>

            <div className="details">
                <h2>{movie.title}</h2>
                <img className="poster" src={movie.poster_path} alt={movie.title} />

                <div className="info">
                    <h2>Vote Average {movie.vote_average}</h2>
                    <h2>Original language: {movie.original_language}</h2>
                    <h2>Genres: {movie.genres}</h2>
                    <h4>Overview: {movie.overview}</h4>
                </div>
            </div>
        </div>
    );
};

const TvshowDetails = () => {
    const { id } = useParams(); // Extract id from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5197/tvshow/${id}`);
                const data = await response.json();
                setMovie(data.movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="MovieDetails-container">
            <div className="backdrop" style={{ backgroundImage: `url('${movie.backdrop_path}')` }}></div>

            <div className="details">
                <h2>{movie.title}</h2>
                <img className="poster" src={movie.poster_path} alt={movie.title} />

                <div className="info">
                    <h2>Vote Average {movie.vote_average}</h2>
                    <h2>Original language: {movie.original_language}</h2>
                    <h2>Genres: {movie.genres}</h2>
                    <h4>Overview: {movie.overview}</h4>
                </div>
            </div>
        </div>
    );
}

const BookDetails = () => {
    const { id } = useParams(); // Extract id from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5197/book/${id}`);
                const data = await response.json();
                setMovie(data.movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="MovieDetails-container">
            <div className="backdrop" style={{ backgroundImage: `url('${movie.backdrop_path}')` }}></div>

            <div className="details">
                <h2>{movie.title}</h2>
                <img className="poster" src={movie.poster_path} alt={movie.title} />

                <div className="info">
                    <h2>Vote Average {movie.vote_average}</h2>
                    <h2>Original language: {movie.original_language}</h2>
                    <h2>Genres: {movie.genres}</h2>
                    <h4>Overview: {movie.overview}</h4>
                </div>
            </div>
        </div>
    );
}
const MangaDetails = () => {
    const { id } = useParams(); // Extract id from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5197/manga/${id}`);
                const data = await response.json();
                setMovie(data.movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="MovieDetails-container">
            <div className="backdrop" style={{ backgroundImage: `url('${movie.backdrop_path}')` }}></div>

            <div className="details">
                <h2>{movie.title}</h2>
                <img className="poster" src={movie.poster_path} alt={movie.title} />

                <div className="info">
                    <h2>Vote Average {movie.vote_average}</h2>
                    <h2>Original language: {movie.original_language}</h2>
                    <h2>Genres: {movie.genres}</h2>
                    <h4>Overview: {movie.overview}</h4>
                </div>
            </div>
        </div>
    );
}


export {
    MovieDetails,
    TvshowDetails,
    BookDetails,
    MangaDetails
    
};

