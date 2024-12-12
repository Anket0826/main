import React, { useState } from 'react';
import { Typography, Grid, Button, TextField } from '@mui/material';
import '../styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Images from '../assets/singIn.png'
const Login = () => {
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate()

    const validateFields = () => {
        const newErrors = {};

        if (!userName.trim()) {
            newErrors.userName = 'Full Name is required.';
        }

        if (!email.trim()) {
            newErrors.email = 'Email Address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value)
        setError((prevErrors) => ({
            ...prevErrors, userName: ''
        }))
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setError((prevErrors) => ({
            ...prevErrors, email: ''
        }))
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setError((prevErrors) => ({
            ...prevErrors, password: ''
        }))
    }

    const handleSignIn = async () => {
        if (!validateFields()) {
            return;
        }
        const newUserId = +Date.now();
        try {
            let users = JSON.parse(localStorage.getItem('user')) || [];
            if (!Array.isArray(users)) {
                users = [];
            }
            const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
            if (userExists) {
                toast.error('This email is already registered. Please use a different email.', {
                autoClose: 3000,
                });
                return;
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: newUserId,
                    name: userName,
                    email: email,
                    password: password,
                })
            });
            if (response.ok) {
                const user = await response.json();
                console.log(user);
                const newUser = {
                    userId: newUserId,
                    name: userName,
                    email: email,
                    password: password,
                };
                users.push(newUser);
                localStorage.setItem('user', JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                toast.success('This Email Register successfully.', {
                    style: { backgroundColor: 'green', color: 'white', height: "60px", width: "400px", paddingRight: "100px" },
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.log("Error while navigating to home page", error);
        }
    };

    return (
        <Typography>
            <Toaster position='top-right' autoClose={2000} />
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
                            ml={30}
                            pt={12}
                        >Sing Up</Typography>

                        <Typography className='text-color' ml={15}>
                            <Typography variant="body1" sx={{ mt: 2, fontSize: "15px" }}>Full Name</Typography>
                            <TextField
                                className='sing-input'
                                placeholder='Enter your full name'
                                value={userName}
                                onChange={handleNameChange}
                                helperText={error.userName}
                                error={Boolean(error.userName)}

                            />
                            <br />

                            <Typography variant="body1" sx={{ mt: 5, fontSize: "15px" }}>Email Address</Typography>
                            <TextField
                                className='sing-input'
                                placeholder='Enter your email'
                                value={email}
                                onChange={handleEmailChange}
                                helperText={error.email}
                                error={Boolean(error.email)}
                            />
                            <br />

                            <Typography variant="body1" sx={{ mt: 5, fontSize: "15px" }}>Password</Typography>
                            <TextField
                                className='sing-input'
                                placeholder='Enter your password'
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                helperText={error.password}
                                error={Boolean(error.password)}
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
                                Sign Up
                            </Button>
                            <Typography fontSize={13} mt={2}>
                                By clicking sign up, you agree to our Terms of Use and Privacy Policy
                            </Typography>
                            <Typography mt={1} ml={13}>
                                Already registered? <Link style={{ textDecorationLine: 'none' }} to={'/'}>Sing In</Link>
                            </Typography>
                        </Typography>

                    </Typography>
                </Grid>
            </Grid>

        </Typography>
    )
}
export default Login;