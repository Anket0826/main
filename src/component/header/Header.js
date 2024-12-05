import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Popover, Tabs, Tab, Switch, Button } from "@mui/material";
import '../../styles/Header.scss';
import UserImages  from '../../assets/user.png'
import { Link } from "react-router-dom";
const Header = ({ tabValue, onTabChange, priorityFilter, categories2, onPriorityChange, handleCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [theme, setTheme] = useState("light");
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.classList.add(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    };
 
    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(storedCategories);
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem("user")) || {};
        setUserName(usersData.name || "Guest");
        setEmail(usersData.email || "No Email Available");
    }, []);

    return (
        <Typography className="main-header">
            <AppBar className="main-header" position="static">
                <Toolbar>

                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        Todo List App
                    </Typography>
                    <Tabs
                        value={tabValue}
                        onChange={onTabChange}
                        textColor="inherit"
                        aria-label="task status tabs"
                    >
                        <Tab label="All Tasks" />
                        <Tab label="Pending Tasks" />
                        <Tab label="Completed Tasks" />
                    </Tabs>

                    <select
                        value={priorityFilter}
                        onChange={(e) => onPriorityChange(e.target.value)}
                        displayEmpty
                        className="priority-select"
                    >
                        <option value="">PRIORITIES</option>
                        <option value="High">HIGH</option>
                        <option value="Medium">MEDIUM</option>
                        <option value="Low">LOW</option>
                    </select>

                    <select
                        displayEmpty
                        value={categories2}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="priority-select"
                    >
                        <option value="">CATEGORY</option>
                        {categories?.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <Typography pl={3}>
                        <span onClick={handleOpen} style={{ cursor: "pointer", fontSize:"15px"}}>
                         <img className="user-image" src={UserImages} alt=""/>   {userName}
                        </span>
                        <Popover

                            sx={{ marginTop: "45px" }}
                            open={isOpen}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                        >
                            <Typography className="users-popup">
                                <Typography> {userName || "User"}</Typography>
                                <Typography mt={1}> {email || "Email not set"}</Typography>

                                <Typography sx={{ paddingRight: "50px" }} mt={2}>
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={toggleTheme}
                                        color="default"
                                    /> {theme === "light" ? 'Light Mode' : 'Dark Mode'}
                                </Typography>
                                <Typography>

                                    <Link to={'/'} > <Button sx={{ color: 'red' }}>
                                        Log Out    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    </Button>
                                    </Link>
                                </Typography>
                            </Typography>
                        </Popover>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Typography>
    );
};

export default Header;
