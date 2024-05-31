import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signin', {
                email,
                password,
            });
            console.log(response.data);
            // Check if sign-in was successful
            if (response.status === 200) {
                // Sign-in successful, do something (e.g., redirect user)
                toast.success('Sign-in successful');
                console.log(response.data.user)
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                navigate("/")
            } else {
                // Sign-in failed, display error message
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error, such as displaying an error message to the user
            setError('An error occurred while signing in');
        }
    };

    return (
        <>
            <button type="button" className="btn btn-secondary ms-3 me-3" data-bs-toggle="modal" data-bs-target="#signInModal">
                Sign In
            </button>

            <div className="modal fade" id="signInModal" tabIndex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signInModalLabel">Sign In</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSignIn}>
                                <div className="mb-3">
                                    <label htmlFor="signInEmail" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="signInEmail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signInPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="signInPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Toaster />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
