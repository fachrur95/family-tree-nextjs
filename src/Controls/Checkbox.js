import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

const Checkbox = forwardRef((props, ref) => {
  const { control, name, label, defaultValue, ...others } = props;
  return (
    <div ref={ref}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || false}
        render={({ field: { value } }) => (
          <FormControl style={{ margin: "0 8px" }}>
            <FormControlLabel
              control={
                <MuiCheckbox
                  name={name}
                  color="primary"
                  checked={value}
                  {...others}
                />
              }
              label={label || ""}
            />
          </FormControl>
        )}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";
export default Checkbox;
