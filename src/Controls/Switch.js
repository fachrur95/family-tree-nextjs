import {
  FormControl,
  FormControlLabel,
  Switch as MuiSwitch,
} from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

// const styles = {
//   root: {
//     ml: 2,
//   },
// };

const Switch = forwardRef((props, ref) => {
  const { name, label, control, onChange, defaultValue, ...others } = props;
  return (
    <div ref={ref}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ref } }) => (
          <FormControl>
            <FormControlLabel
              control={
                <MuiSwitch
                  color="primary"
                  inputRef={ref}
                  checked={value}
                  // onChange={(e) => onChange(e.target.checked)}
                  onChange={onChange}
                  {...others}
                />
              }
              label={label}
            />
          </FormControl>
        )}
      />
    </div>
  );
});

Switch.displayName = "Switch";
export default Switch;
