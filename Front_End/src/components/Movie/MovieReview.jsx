import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export const MovieReview = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=f190d975`);
                setMovieData(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    return (
        <div>
            <NavBar />
            <div className="container" style={{ marginTop: "40px" }}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : movieData ? (
                    <>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="text-center">
                                    <img src={movieData.Poster} className="img-fluid rounded shadow" alt={`${movieData.Title} Poster`} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card bg-dark text-light mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Details</h5>
                                        <p className="card-text"><strong>Year:</strong> {movieData.Year}</p>
                                        <p className="card-text"><strong>Rated:</strong> {movieData.Rated}</p>
                                        <p className="card-text"><strong>Released:</strong> {movieData.Released}</p>
                                        <p className="card-text"><strong>Runtime:</strong> {movieData.Runtime}</p>
                                        <p className="card-text"><strong>Genre:</strong> {movieData.Genre}</p>
                                        <p className="card-text"><strong>IMDB Rating:</strong> {movieData.imdbRating}</p>
                                        <p className="card-text"><strong>Type:</strong> {movieData.Type}</p>
                                        <p className="card-text"><strong>Director:</strong> {movieData.Director}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card bg-dark text-light mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Movie Details</h5>
                                        <table className="table table-dark">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Writer:</strong></td>
                                                    <td>{movieData.Writer}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Actors:</strong></td>
                                                    <td>{movieData.Actors}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Plot:</strong></td>
                                                    <td>{movieData.Plot}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Language:</strong></td>
                                                    <td>{movieData.Language}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Country:</strong></td>
                                                    <td>{movieData.Country}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Awards:</strong></td>
                                                    <td>{movieData.Awards}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="card bg-dark text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">Ratings</h5>
                                        <ul className="list-unstyled">
                                            {movieData.Ratings.map((rating, index) => (
                                                <li key={index} className="card-text">
                                                    <strong>{rating.Source}:</strong> {rating.Value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>No data available for this movie.</div>
                )}
            </div>
        </div>
    );
};
