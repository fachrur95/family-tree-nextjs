import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "./Headers";
import Navbar from "./Navbars";
import BottomNavbar from "./Navbars/bottom";

const drawerWidth = 240;

const DashboardLayoutWithDrawer = (props) => {
  const { children, window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Navbar
        window={window}
        drawerWidth={drawerWidth}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          width: "100%",
        }}
      >
        <Toolbar />
        {children}
        <BottomNavbar />
      </Box>
    </Box>
  );
};

DashboardLayoutWithDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.any,
};

export default DashboardLayoutWithDrawer;
