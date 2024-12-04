import { Typography } from "@mui/material";
import React from "react";
import noFound from '../assets/No-Page.png'
const NoTaskFound = () => {
    return (
        <Typography sx={{
            fontSize: "35px",
            textAlign: "center",
            marginTop: "10%",
            fontWeight: "bold",
        }}>
            <img src={noFound} alt="no-Task" height={130} /><br />
            Page Not Found
        </Typography>
    )
}
export default NoTaskFound;