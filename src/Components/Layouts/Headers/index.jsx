import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ThemeChanger from "./_components/ThemeChanger";

const Header = forwardRef((props, ref) => {
  const { drawerWidth, handleDrawerToggle } = props;
  return (
    <AppBar
      ref={ref}
      position="fixed"
      sx={{
        // width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Family Tree
        </Typography>
        <div style={{ display: "flex", flexGrow: 1 }} />
        <ThemeChanger />
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = "Header";

export default Header;
