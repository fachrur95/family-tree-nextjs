import React, { forwardRef, useRef, useState } from "react";
import {
  Button,
  ButtonGroup as MuiButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const styles = {
  root: {
    m: 0.9,
  },
  divBox: {
    float: "left",
  },
  // label: {
  //     textTransform: 'none'
  // }
};

const ButtonGroup = forwardRef((props, ref) => {
  const {
    variant,
    size,
    color,
    textLabelShown,
    handleClickShown,
    options,
    direction,
    disabledMain,
    addStyle,
    ...others
  } = props;
  const curThemeName = localStorage.getItem("appTheme") || "light";

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div ref={ref} style={addStyle}>
      <MuiButtonGroup
        variant={variant || curThemeName === "dark" ? "outlined" : "contained"}
        size={size || "large"}
        color={color || "primary"}
        ref={anchorRef}
        aria-label="split button"
        sx={styles.root}
        // className={classes.root}
        {...others}
      >
        <Button onClick={handleClickShown} disabled={disabledMain || false}>
          {textLabelShown}
        </Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {direction === "down" ? <ArrowDropDown /> : <ArrowDropUp />}
        </Button>
      </MuiButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        style={{ zIndex: "2000" }}
        placement="top-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      // disabled={index === 2}
                      // selected={index === selectedIndex}
                      onClick={() => {
                        option.eventClick();
                        setOpen(false);
                      }}
                      disabled={option.disabled || false}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
});
ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;
