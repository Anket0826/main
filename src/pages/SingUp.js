import React, { useState } from 'react';
import { Typography, Grid, Input, Button, TextField } from '@mui/material';
import '../styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Images from '../assets/singIn.png'
const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
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

    const handleSignIn = async () => {
      if(!validateFields()){
        return
      }

      const users = JSON.parse(localStorage.getItem('user')) || [];
      const userExists = Array.isArray(users) && users.some(user => user.email === email);
      if (userExists) {
          toast.error('This email is already registered. Please use a different email.');
          return;
      }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    email: email,
                    password: password,
                })
            })
            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('User created successfully', {
                    style: { backgroundColor: "green", color: "white", height: "15px" }
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            }
        } catch (error) {
            console.log("Error while navigating to home page");
        }
    };

    return (
        <Typography>
            <ToastContainer autoClose={2000} />
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={6} className="">
                    <Typography>
                        <img src={Images} height={606} width={670} />
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
                            <Input
                                className='sing-input tital-input'
                                placeholder='Enter your full name'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                              
                            />
                             {error.userName && <span className='validation-error'>{error.userName}</span>}
                            <br />

                            <Typography variant="body1" sx={{ mt: 2,fontSize: "15px" }}>Email Address</Typography>
                            <Input
                                className='sing-input tital-input'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                             {error.email && <span className='validation-error'>{error.email}</span>}
                            <br />

                            <Typography variant="body1" sx={{ mt: 2,fontSize: "15px" }}>Password</Typography>
                            <Input
                                className='sing-input tital-input'
                                placeholder='Enter your password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                Sign Up
                            </Button>
                            <Typography fontSize={13} mt={2}>
                            By clicking sign up, you agree to our Terms of Use and Privacy Policy
                            </Typography>
                            <Typography mt={1} ml={13}>
                            Already registered? <Link style={{textDecorationLine: 'none'}} to={'/'}>Sing In</Link>
                                </Typography>
                        </Typography>

                    </Typography>
                </Grid>
            </Grid>

        </Typography>
    )
}
export default Login;