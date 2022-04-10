import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ThemeChanger from "./_components/ThemeChanger";

const DefaultHeader = forwardRef((props, ref) => {
  return (
    <AppBar ref={ref}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Family Tree
        </Typography>
        <div style={{ display: "flex", flexGrow: 1 }} />
        <ThemeChanger />
      </Toolbar>
    </AppBar>
  );
});

DefaultHeader.displayName = "DefaultHeader";

export default DefaultHeader;
