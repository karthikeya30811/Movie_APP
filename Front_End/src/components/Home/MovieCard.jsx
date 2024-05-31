import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

export const MovieCard = ({ item, isDarkMode }) => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const handleAddToWatchlist = async () => {
        try {
            // Send data to backend
            await axios.post('http://localhost:3000/watchlist', {
                Title: item.Title,
                Year: item.Year,
                Poster: item.Poster,
                imdbID: item.imdbID,
                userId: userData._id
            });
            // Handle success (e.g., show a success message)
            console.log('Added to watchlist successfully');
            toast.success('Added Succesfully');
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error adding to watchlist:', error);
        }
    };

    return (
        <div className={`card card-1 ${isDarkMode ? 'card-dark' : ''}`} style={{ width: "18rem" }}>
            <img src={item?.Poster} className="card-img-top" alt="Movie Poster" />
            <div className="card-body">
                <h5 className="card-title">{item?.Title}</h5>
                <p className="card-text">Year: {item?.Year}</p>
                <Toaster />
                <Link to={`/movie/${item?.imdbID}`} className="btn btn-primary me-3">Know More</Link>
                <button className="btn btn-secondary" onClick={handleAddToWatchlist}>Watchlist</button>
            </div>
        </div>
    );
};
