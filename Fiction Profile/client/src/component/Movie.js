import React, { useState, useEffect } from 'react';
import './Movie.css';
const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:5197/movies');
                const data = await response.json();
                setMovies(data.movies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    });

    return (
        <div className='Moviediv'>
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.title}>
                        <img src={movie.poster_path} alt={`${movie.title} Poster`} />
                        <p>{movie.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movie;
