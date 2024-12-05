import React, { useState } from 'react';
import { Typography, Grid, Input, Button, TextField } from '@mui/material';
import '../styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Images from '../assets/singIn.png'
const SingIn = () => {
    const [error, setError] = useState('');
    const [passwords, setPasswords] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const navigate = useNavigate()

    const validateFields = () => {
        const newErrors = {};
        if (!emailAddress.trim()) {
            newErrors.emailAddress = 'Email Address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
            newErrors.emailAddress = 'Please enter a valid email address.';
        }

        if (!passwords.trim()) {
            newErrors.passwords = 'Password is required.';
        } else if (passwords.length < 6) {
            newErrors.passwords = 'Password must be at least 6 characters long.';
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignIn = () => {
        if (!validateFields()) {
            return;
        }
        try {
            const storedUsers = JSON.parse(localStorage.getItem('user')) || [];
            const user = storedUsers.find(
                (u) => u.email.toLowerCase() === emailAddress.toLowerCase() && u.password === passwords
            );

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));

                toast.success('Sign In successful', {
                    style: { backgroundColor: 'green', color: 'white', height: '15px' },
                });
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                toast.error('Invalid email or password. Please try again.', {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };
    return (
        <Typography>
            <ToastContainer autoClose={2000} />
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={6} className="">
                    <Typography>
                        <img src={Images} className='singUP-png' width={670} />
                    </Typography>
                </Grid>

                <Grid item xs={6} className="main-sing" >
                    <Typography>
                        <Typography
                            variant='h4'
                            fontWeight="bold"
                            ml={30}
                            pt={17}
                        >Sing In</Typography>

                        <Typography className='text-color' ml={15}>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: "15px" }}>Email Address</Typography>
                            <Input
                                className='sing-input tital-input'
                                placeholder='Enter your email'
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                            {error.email && <span className='validation-error'>{error.email}</span>}
                            <br />

                            <Typography variant="body1" sx={{ mt: 2, fontSize: "15px" }}>Password</Typography>
                            <Input
                                className='sing-input tital-input'
                                placeholder='Enter your password'
                                type="password"
                                value={passwords}
                                onChange={(e) => setPasswords(e.target.value)}
                            />
                            {error.password && <span className='validation-error'>{error.password}</span>}
                            <br />

                            <Button
                                sx={{
                                    mt: "25px",
                                    width: "80%",
                                    backgroundColor: "blue",
                                    color: "white",
                                    ":hover": { backgroundColor: "darkblue" },
                                }}
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                          
                            <Typography mt={4} ml={18}>
                                <Link style={{textDecorationLine: 'none'}} to={'/singup'}>Create a new account</Link>
                            </Typography>
                        </Typography>

                    </Typography>
                </Grid>
            </Grid>

        </Typography>
    )
}
export default SingIn;