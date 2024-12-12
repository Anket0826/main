import React, { useState } from 'react';
import { Typography, Grid, Button, TextField } from '@mui/material';
import '../styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
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

    const EmailAddress = (e) => {
        setEmailAddress(e.target.value)
        setError((prevErrors) => ({
            ...prevErrors, emailAddress: ''
        }))
    }

    const PasswordChange = (e) => {
        setPasswords(e.target.value)
        setError((prevErrors) => ({
            ...prevErrors, passwords: ''
        }))
    }

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

                toast.success('Sign In Successfully.', {
                    style: { backgroundColor: 'green', color: 'white', height: "60px", width: "300px", paddingRight: "100px"},
                });
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                toast.error('Invalid email or password. Please try again.');
                
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };
    return (
        <Typography>
            <Toaster position='top-right'/>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={6} className="">
                    <Typography>
                        <img src={Images} className='singUP-png' alt='' width={670} />
                    </Typography>
                </Grid>

                <Grid item xs={6} className="main-sing" >
                    <Typography>
                        <Typography
                            variant='h4'
                            fontWeight="bold"
                            ml={35}
                            pt={17}
                        >Sing In</Typography>

                        <Typography className='text-color' ml={15}>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: "15px" }}>Email Address</Typography>
                            <TextField
                                className='sing-input '
                                placeholder='Enter your email'
                                value={emailAddress}
                                onChange={EmailAddress}
                                helperText={error.emailAddress}
                                error={Boolean(error.emailAddress || false)}
                            />
                            <br />

                            <Typography variant="body1" sx={{ mt: 5, fontSize: "15px" }}>Password</Typography>
                            <TextField
                                className='sing-input'
                                placeholder='Enter your password'
                                type="password"
                                value={passwords}
                                onChange={PasswordChange}
                                helperText={error.passwords}
                                error={Boolean(error.passwords)}
                            />
                            <br />

                            <Button
                                sx={{
                                    mt: "40px",
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
                                <Link style={{ textDecorationLine: 'none' }} to={'/singup'}>Create a new account</Link>
                            </Typography>
                        </Typography>

                    </Typography>
                </Grid>
            </Grid>

        </Typography>
    )
}
export default SingIn;