import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import React, { forwardRef } from "react";

const styles = {
  root: {
    minWidth: "100%",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Select = forwardRef((props, ref) => {
  const { name, label, value, error = null, onChange, options } = props;
  return (
    <div ref={ref}>
      <FormControl
        variant="outlined"
        size="small"
        sx={styles.root}
        {...(error && { error: true })}
      >
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
});

Select.displayName = "Select";
export default Select;
