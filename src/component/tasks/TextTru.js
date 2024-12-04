import { Tooltip, Typography } from "@mui/material";
import React from "react";

const TruncatedText = ({ text, maxLength }) => {
    return (
     <Typography>
       <Tooltip title={text} arrow>
        <Typography
          variant="h5"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "60%",
          }}
        >
          {text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
        </Typography>
      </Tooltip>
     </Typography>
    );
  };
  export default TruncatedText;