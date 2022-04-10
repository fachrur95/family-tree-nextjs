import React, { forwardRef } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ThemeContext from "../../../../Context/ThemeContext";

const ThemeChanger = forwardRef((props, ref) => {
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  return (
    <div ref={ref}>
      <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
});

ThemeChanger.displayName = "ThemeChanger";

export default ThemeChanger;
