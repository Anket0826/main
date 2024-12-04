import React, { useEffect, useState } from "react";
import {
    CssBaseline,
    Container,
    Box,
    Button,
    Grid,
    Typography,
    TextField,
    Input,
} from "@mui/material";
// import '../styles/style.css'
import '../styles/HomePage.scss'
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import TaskCard from "../component/tasks/TaskCard";
import TaskModal from "../component/modal/TaskModal";
import { useTasks } from "../hooks/useTasks";
import NoTasksPlaceholder from "./NoTasksPlaceholder";
import SearchIcon from '../assets/search-icon.svg';
import { useLocation, useNavigate } from "react-router-dom";
import AddSubTasks from "../component/modal/AddSubTasks";
const HomePage = () => {
    const [tabValue, setTabValue] = useState(0);
    const { tasks, addTask, deleteTask, editTask, taskExists } = useTasks();
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation()
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categories, setCategories] = useState("")

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
        setPriorityFilter("");
        setCategories("")
        if (newValue === 1) {
            navigate('/pending-task');
        } else if (newValue === 2) {
            navigate('/completed-task');
        } else {
            navigate('/home');
        }
    };

    useEffect(() => {
        if (location.pathname === '/pending-task') {
            setTabValue(1);
        } else if (location.pathname === '/completed-task') {
            setTabValue(2);
        } else {
            setTabValue(0);
        }
    }, [location.pathname]);

    const handleOpenModal = (task = null) => {
        setEditData(task);
        setOpenModal(true);
        navigate('/add-task')
    };

    const handlePriorityChange = (priority) => {
        setPriorityFilter(priority);
    }

    const handleCategoryChange = (category) => {
        setCategories(category);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditData(null);
    };

    const searchFilter = tasks
        .filter((task) => {
            if (tabValue === 0) return true;
            if (tabValue === 1) return task.status === "Pending";
            if (tabValue === 2) return task.status === "Completed";
            if (tabValue === 3) return task.priority === "High";
            // if (tabValue === 4) return task.categoriess === "Work";
            return
        })
        .filter((task) => {
            if (priorityFilter) return task.priority === priorityFilter;
            return true;
        })
        .filter((task) => {
            if (categories) return task.category === categories;
            return true;
        })
        .filter((task) =>
            task?.tital?.toLowerCase().includes(searchQuery.toLowerCase())
        )

    const handleStatusUpdate = (newStatus, taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        addTask(updatedTasks);
        editTask({ id: taskId, status: newStatus });
    };

    return (
        <>
            <CssBaseline />
            <Header tabValue={tabValue} onTabChange={handleTabChange} priorityFilter={priorityFilter} onPriorityChange={handlePriorityChange} handleCategoryChange={handleCategoryChange} categories2={categories} />
            <Typography >
                <Box mt={4} justifyContent="space-between" alignItems="center">
                    <Button className="tasks-add" variant="contained" onClick={() => handleOpenModal()}>
                        Add New Task
                    </Button>
                    <img src={SearchIcon} className="search-icon" />
                    <Input
                        sx={{
                            width: "20%",
                            left: "1%",
                            position: "relative",
                            height: "42px",
                        }}
                        type="text"
                        className="search-field"
                        placeholder="Search Tital"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchFilter.length === 0 && <NoTasksPlaceholder
                        tasks={tasks} />
                    }
                </Box>
                <Typography sx={{ overflowY: 'auto', height: "400px", scrollbarWidth: "none" }}>
                    <Grid container spacing={2} mt={2}>
                        {searchFilter.length > 0 ? (
                            <>
                                {searchFilter
                                    .filter((task) => {
                                        if (tabValue === 0) return true;
                                        if (tabValue === 1) return task.status === "Pending";
                                        return task.status === "Completed";
                                    })
                                    .map((task) => (
                                        <Grid item xs={12} sm={6} md={3} key={task.id}>
                                            <TaskCard task={task} onDelete={deleteTask} onEdit={handleOpenModal} onStatusUpdate={handleStatusUpdate} />
                                        </Grid>
                                    ))}
                            </>
                        ) : (
                            <Typography sx={{ marginLeft: "45%", marginTop: "100px", fontSize: "30px" }}>No Tasks Found</Typography>
                        )}
                    </Grid>

                    <TaskModal
                        open={openModal}
                        onClose={handleCloseModal}
                        task={editData}
                        taskExists={taskExists}
                        editTask={editTask}
                        onSave={(task) => {
                            if (editData) {
                                editTask(task);
                            } else {
                                addTask(task);
                            }
                        }}
                    />
                 
                </Typography>
            </Typography>
            <Footer />
        </>
    );
};

export default HomePage;
