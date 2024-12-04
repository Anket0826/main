import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import '../../styles/TaskCard.scss';
import TruncatedText from "./TextTru";
import AddSubTasks from "../modal/AddSubTasks";
import { useTasks } from "../../hooks/useTasks";

const TaskCard = ({ task, onDelete, onEdit, onStatusUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { tasks, addTask, editTask, taskExists } = useTasks();
  const [editData, setEditData] = useState(null);
  const [OpenSubTasks, setOpenSubTasks] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const openSubTasks = () => {
    setOpenSubTasks(true)
    setEditData(task)
  }

  const handleClose = () => {
    setOpenSubTasks(false)
    setEditData(null)
  }

  const handleOpenDialog = () => {
    setDeletePopup(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setDeletePopup(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setDeletePopup(false);
  };

  const handleEdit = () => {
    onEdit(task);
    handleCloseMenu();
  };

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(newStatus, task.id);
    handleCloseMenu();
  };

  const statusColor = task.status === "Completed" ? "green" : "orange";

  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }
  const progress = task.status === "Completed" ? 100 : 50;
  const progressColor = task.status === "Completed" ? "green" : "orange"
  return (
    <>
      <Card className="card-style">
        <CardContent>
          <Typography variant="h5">
            <TruncatedText text={task.tital} maxLength={15} />
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: statusColor }}
          >
            <span className="status">Status:</span> {task.status}
          </Typography>
          <Typography display={"flex"} alignItems="center">

            <Typography variant="body2" color={priorityColors[task.priority]}>
              <span className="status">Priority:</span> {task.priority}
            </Typography>
            <Box position="relative" display="inline-flex" ml={18}>
              <CircularProgress
                variant="determinate"
                value={progress}
                sx={{ color: progressColor }}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  component="div"
                  fontSize={11}
                  fontWeight="bold"
                >
                  {`${progress}%`}
                </Typography>
              </Box>
            </Box>

          </Typography>

          <Typography variant="body2">
            Category: {task.category}
          </Typography>

          <Typography pt={1} variant="body2">
            SubTasks: {task.subtasks}
          </Typography>

          <Typography display={'flex'} alignItems={'center'}>

            <Typography variant="body2">Created date: {formatDate(task.createdOn)}</Typography>

            <AddSubTasks
              OpenSubTasks={OpenSubTasks}
              handleClose={handleClose}
              openSubTasks={openSubTasks}
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
        </CardContent>
        <CardActions >
          <IconButton className="edit-button status" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu className="menu-theme" anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleStatusChange("Completed")}>Completed</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleOpenDialog}>Delete</MenuItem>
          </Menu>
        </CardActions>
      </Card>

      <Dialog
        sx={{ width: "33%", marginLeft: "33%" }}
        open={deletePopup}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="cancel" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button className="save" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default TaskCard;
