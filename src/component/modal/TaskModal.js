import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, TextField, Button, Typography, InputLabel, MenuItem, FormControl, Select, Grid, Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DelectIcon from '../../assets/deleteListing.png'
import EditIcon from '../../assets/Edit.png'
import '../../styles/TaskModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const TaskModal = ({ open, onClose, onSave, task }) => {
    const [tital, setTital] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("")
    const [selectCategory, setSelectCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [editIndex, setEditIndex] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (task) {
            setTital(task.tital || "");
            setStatus(task.status || "");
            setPriority(task.priority || "")
            setSelectCategory(task.category || "");
            setCategories(task.categories || []);
            if (task?.endDate) {
                const parsedDate = new Date(task.endDate);
                if (!isNaN(parsedDate)) {
                    setEndDate(parsedDate);
                } else {
                    console.error("Invalid date format for task.endDate:", task.endDate);
                    setEndDate(null);
                }
            } else {
                setEndDate(null);
            }

        } else {
            setTital("");
            setStatus("");
            setPriority("")
            setCategory("")
            setSelectCategory("");
            setEndDate("")
            setCategories(JSON.parse(localStorage.getItem("categories")) || []);
        }
        setErrors({})
    }, [task]);

    const handleTitalChange = (e) => {
        setTital(e.target.value)
        setErrors((prevErrors) => ({
            ...prevErrors, tital: ''
        }))
    }

    const handleSave = () => {
        const newError = {};
        if (!tital.trim()) {
            newError.tital = "Tital is required.";
        }
        if (Object.keys(newError).length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, ...newError }));
            return;
        }
        const newTask = {
            id: task?.id || Date.now(),
            tital,
            status,
            priority,
            category: selectCategory,
            categories,
            endDate: endDate?.toLocaleDateString(),
            createdOn: task?.createdOn || new Date().toLocaleDateString(),
        };

        onSave(newTask);
        onClose();
        navigate('/home')
        setTital("");
        setStatus("");
        setErrors({})
        setPriority("")
        setCategory('');
        setSelectCategory('');
        setCategories([])
    };

    const addCategory = () => {
        if (category.trim() === "") return;
        if (editIndex !== null) {
            const updatedCategories = [...categories];
            updatedCategories[editIndex] = category;
            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            setEditIndex(null);
        } else {
            const updatedCategories = [...categories, category];
            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
        }
        setCategory("");
    };

    const removeCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    const editCategory = (index) => {
        setCategory(categories[index]);
        setEditIndex(index);
    };

    const handleDateChange = (date) => {
        setEndDate(date)
    }

    return (
        <Typography>
            <Dialog className="add-theme" open={open}>
                <Typography sx={{ fontSize: "25px", ml: "20px", mt: "20px" }}>
                    {task ? "Edit Task" : "Add New Task"}
                </Typography>
                <DialogContent className="add-popup">
                    <Typography display='flex' alignItems='center'>
                        <Input
                            className="tital-input"
                            placeholder="Task Tital"
                            value={tital}
                            onChange={handleTitalChange}
                            helperText={errors.tital}
                            error={Boolean(errors.tital)}
                        />
                        <DatePicker
                            className="end-date"
                            selected={endDate}
                            onChange={handleDateChange}
                            dateFormat='dd/MM/yyyy'
                            placeholderText="End Date"
                        />
                    </Typography>
                    <Grid sx={{ display: "flex" }} >
                        <TextField
                            className="text-field-container"
                            sx={{ marginTop: "20px", width: "35%", border: "1px solid white", borderRadius: "3px" }}
                            name="status"
                            select
                            value={status}
                            required
                            onChange={(e) => setStatus(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="">S Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </TextField>

                        <TextField
                            className="text-field-container"
                            sx={{ marginTop: "20px", marginLeft: "25px", width: "35%", border: "1px solid white", borderRadius: "3px" }}
                            name="Priority"
                            select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="">S Priority</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </TextField>
                        < TextField
                            sx={{ marginTop: "20px", marginLeft: "25px", width: "35%", border: "1px solid white", borderRadius: "3px" }}
                            select
                            className="text-field-container"
                            name="Category"
                            value={selectCategory}
                            onChange={(e) => setSelectCategory(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="">S Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </TextField>
                    </Grid>

                    <Typography sx={{ display: "flex" }}>
                        <Input
                            className="category-input tital-input"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                        </Input>
                        <Button onClick={addCategory} sx={{ border: "1px solid gray", height: "55px", width: "20%", marginTop: "20px", marginLeft: "10px" }}>
                            {editIndex !== null ? "Update" : "Add"}
                        </Button>
                    </Typography>

                    {categories.length > 0 && (
                        <Typography sx={{ marginTop: "20px" }}>
                            <strong>Categories:</strong>
                            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "8px",
                                        }}>
                                        <span>{cat}</span>
                                        <span>
                                            <Button
                                                size="small"
                                                onClick={() => removeCategory(index)}
                                                sx={{ minWidth: 0, padding: 0, marginLeft: "9px" }}
                                            >
                                                <img src={DelectIcon} alt="Delete" height={17} />
                                            </Button>
                                            <Button
                                                size="small"
                                                onClick={() => editCategory(index)}
                                                sx={{ minWidth: 0, padding: 0, marginLeft: "10px" }}
                                            >
                                                <img src={EditIcon} alt="Edit" height={17} />
                                            </Button>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    )}
                </DialogContent>
                <Typography>
                    <Button className="save" onClick={handleSave}>
                        {task ? "Update" : "Save"}
                    </Button>
                    <Link to={'/home'}> <Button className="cancel" onClick={onClose}>
                        Cancel
                    </Button></Link>
                </Typography>
            </Dialog>
        </Typography >
    );
};

export default TaskModal;
