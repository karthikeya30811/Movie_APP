import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './MovieCard'; // Ensure this CSS file includes the dark mode styles
import NavBar from '../NavBar/NavBar';


function HomePage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("batman");
    const [dummy, setDummy] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let combinedData = [];
                setLoading(true)
                for (let i = 1; i <= 3; i++) {
                    const res = await axios.get(`https://www.omdbapi.com/?s=${search}&page=${i}&apikey=f190d975`);
                    if (res.data && res.data.Search) {
                        combinedData = [...combinedData, ...res.data.Search];
                    }
                }
                setData(combinedData);
                if (combinedData.length === 0) {
                    console.log("No data");
                }
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [search]);

    const handleChange = (event) => {
        const value = event.target.value;
        setDummy(value);
        console.log(dummy);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    return (
        <div>
            {!isLoading ?
                <div>
                    <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                    <div className="container">
                        <div className={`input-group mb-3 ${isDarkMode ? 'input-group-dark' : ''}`} style={{ gap: "10px" }} >
                            <input
                                type="text"
                                className={`form-control ${isDarkMode ? 'search-dark' : ''}`}
                                placeholder="Search movies..."
                                aria-label="Search movies"
                                aria-describedby="button-addon2"
                                onChange={handleChange}

                                style={{ marginTop: "50px", width: "600px", marginBottom: "70px" }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-addon2"
                                onClick={() => setSearch(dummy)}
                                style={{ marginTop: "50px", width: "300px", marginBottom: "70px" }}
                            >
                                Search
                            </button>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <div key={index}>
                                        <MovieCard item={item} isDarkMode={isDarkMode} />
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                </div>
                :
                <h2>Loading...</h2>
            }
        </div>


    );
}

export default HomePage;
