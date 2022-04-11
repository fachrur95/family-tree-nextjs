import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";

const BottomDrawer = forwardRef((props, ref) => {
  const { open, setOpen, children } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const form = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "60vh",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {children}
    </Box>
  );
  return (
    <div ref={ref}>
      <React.Fragment key="bottom">
        <Drawer anchor="bottom" open={open} onClose={handleClose}>
          {form("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
});

export default BottomDrawer;
