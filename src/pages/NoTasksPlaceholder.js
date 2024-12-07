import { Box, Typography } from "@mui/material";
import React from "react";
import noDataFound from '../assets/not-found.png';

const NoTasksPlaceholder = ({ tasks }) => {
    return (
        <Typography ml={70}>
            {tasks.length === 0 && (
                <Box>
                    <img src={noDataFound} alt="" height="200px" />
                    <Typography variant="h6" ml={3} className="not-found">No tasks available.</Typography>
                </Box>
            )}
        </Typography>
    )
}

export default NoTasksPlaceholder