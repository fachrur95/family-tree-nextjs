import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";
import ThemeChanger from "./_components/ThemeChanger";

const WithBack = forwardRef((props, ref) => {
  // console.log(props);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <AppBar ref={ref}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleBack}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div">
          Family Tree
        </Typography>
        <div style={{ display: "flex", flexGrow: 1 }} />
        <ThemeChanger />
      </Toolbar>
    </AppBar>
  );
});

WithBack.displayName = "WithBack";

export default WithBack;
