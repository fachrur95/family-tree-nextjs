import React, { forwardRef } from "react";
import MuiButton from "@mui/material/Button";

const styles = {
  root: {
    m: 0.5,
  },
  // label: {
  //     textTransform: 'none'
  // }
};

const Button = forwardRef((props, ref) => {
  const { text, size, color, variant, onClick, ...other } = props;
  const curThemeName = localStorage.getItem("appTheme") || "light";

  return (
    <MuiButton
      ref={ref}
      variant={variant || curThemeName === "dark" ? "outlined" : "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      sx={styles.root}
      {...other}
    >
      {text}
    </MuiButton>
  );
});
Button.displayName = "Button";
export default Button;
