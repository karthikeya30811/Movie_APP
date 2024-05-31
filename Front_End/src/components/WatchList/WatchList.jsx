import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MovieCard } from '../Home/MovieCard';
import NavBar from '../NavBar/NavBar';

export const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [data, setData] = useState(null); // Initialize data state with null

    useEffect(() => {
        // Fetch userData from local storage
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData && userData._id) {
            // Set data state if userData and userData._id exist
            setData(userData);
        }
    }, []); // Only runs on component mount

    useEffect(() => {
        // Fetch watchlist data when data state changes
        if (data && data._id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/watchlist/${data._id}`);
                    setWatchlist(response.data);
                    console.log(watchlist)
                } catch (error) {
                    console.error('Error fetching watchlist data:', error);
                }
            };
            fetchData();
        }
    }, [data]); // Runs when data state changes

    return (
        <div>
            <NavBar />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "40px" }}>
                {watchlist.length > 0 ? (
                    watchlist.map((item, index) => (
                        <div key={index}>
                            <MovieCard item={item} isDarkMode={false} />
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};
