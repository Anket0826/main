import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../styles/SubTasks.scss";
import DelectIcon from "../../assets/deleteListing.png";
import EditIcon from "../../assets/Edit.png";

const AddSubTasks = ({ openSubTasks, OpenSubTasks, handleClose, onSave, task }) => {
    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedSubtasks = JSON.parse(localStorage.getItem("SubTasks")) || {};
        if (task?.id) {
            setSubtasks(storedSubtasks[task.id] || []);
            setSubtasks(task.subtasks || []);
        } else {
            setSubtasks([]);
        }
    }, [task]);

    const handleAddSubtask = () => {
        if (newSubtask.trim()) {
            const updatedSubtasks = [...subtasks];
            if (editIndex !== null) {
                updatedSubtasks[editIndex] = newSubtask.trim();
                setEditIndex(null);
            } else {
                updatedSubtasks.push(newSubtask.trim());
            }
            setSubtasks(updatedSubtasks);
            saveToLocalStorage(task?.id || "tempTask", updatedSubtasks);
            setNewSubtask("");
        }
    };
    const saveToLocalStorage = (taskId, subtasks) => {
        const storedSubtasks = JSON.parse(localStorage.getItem("SubTasks")) || {};
        storedSubtasks[taskId] = subtasks;
        localStorage.setItem("SubTasks", JSON.stringify(storedSubtasks));
    };

    const handleSave = () => {
        const taskId = task?.id || Date.now();
        saveToLocalStorage(taskId, subtasks);
        const SaveTasksNew = {
            id: taskId,
            subtasks: subtasks,
        };
        onSave(SaveTasksNew);
        handleClose();
    };

    const deleteSubTask = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(updatedSubtasks);
        saveToLocalStorage(task?.id || "tempTask", updatedSubtasks);
    };

    const editSubTask = (index) => {
        setNewSubtask(subtasks[index]);
        setEditIndex(index);
    };

    return (
        <Typography>
            <Button
                onClick={openSubTasks}
                sx={{
                    fontSize: "12px",
                    marginLeft: "30px",
                    marginTop: "5px",
                    width: "80%",
                    height: "30px",
                }}
            >
                Subtask
            </Button>

            <Dialog open={OpenSubTasks} onClose={handleClose}>
                <DialogTitle>Manage Subtasks</DialogTitle>
                <DialogContent className="sub-task">
                    <Typography display="flex" alignItems="center">
                        <Input
                            placeholder={editIndex !== null ? "Edit Subtask" : "Add Subtask"}
                            fullWidth
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                            margin="normal"
                            className="text-field-container tital-input"
                        />
                        <Button
                            onClick={handleAddSubtask}
                            variant="contained"
                            color="primary"
                            sx={{ height: "55px", marginLeft: "10px" }}
                        >
                            {editIndex !== null ? "Update" : "Add"}
                        </Button>
                    </Typography>
                    <List>
                        {subtasks.map((subtask, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <>
                                        <Button
                                            size="small"
                                            onClick={() => deleteSubTask(index)}
                                            sx={{ minWidth: 0, marginRight: "10px" }}
                                        >
                                            <img className="delete-sub" src={DelectIcon} alt="Delete" height={17} />
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => editSubTask(index)}
                                            sx={{ minWidth: 0 }}
                                        >
                                            <img src={EditIcon} alt="Edit" height={17} />
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemText primary={subtask} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="cancel">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="save">
                    {editIndex !== null ? "Update" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Typography>
    );
};

export default AddSubTasks;
