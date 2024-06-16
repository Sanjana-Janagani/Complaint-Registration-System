import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Heading = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ display: { sm: "block" } }}
      >
        CBIT CRS
      </Typography>
    </Box>
  );
};

export default Heading;
