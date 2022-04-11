import React, { forwardRef } from "react";
import Button from "@mui/material/Button";

const styles = {
  secondary: {
    minWidth: 0,
    m: 0.5,
    bgcolor: "secondary.light",
    "& .MuiButton-label": {
      color: "secondary.main",
    },
  },
  primary: {
    minWidth: 0,
    m: 0.5,
    bgcolor: "primary.light",
    "& .MuiButton-label": {
      color: "primary.main",
    },
  },
};

const ActionButton = forwardRef((props, ref) => {
  const { color, children, onClick, disabled } = props;
  return (
    <Button
      ref={ref}
      sx={styles[color]}
      onClick={onClick}
      disabled={disabled || false}
    >
      {children}
    </Button>
  );
});

ActionButton.displayName = "ActionButton";
export default ActionButton;
