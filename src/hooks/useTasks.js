import { useState, useEffect } from "react";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    const saveToLocalStorage = (updatedTasks) => {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        saveToLocalStorage(updatedTasks);
    };

    const editTask = (updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
        saveToLocalStorage(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        saveToLocalStorage(updatedTasks);
    };

    const saveSubtasks = (taskId, subtasks) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, subtasks } : task
        );
        saveToLocalStorage(updatedTasks);
    };

    const taskExists = (taskId) => tasks.some((task) => task.id === taskId);

    return { tasks, addTask, editTask, deleteTask, saveSubtasks, taskExists };
};
