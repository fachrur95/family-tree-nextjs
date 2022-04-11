import { TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

const Input = forwardRef((props, ref) => {
  const { control, name, label, defaultValue, size, rules, ...other } = props;
  const defVal = defaultValue || control._formValues[name] || "";

  return (
    <Controller
      key={`${name}-controller`}
      name={name}
      control={control}
      defaultValue={defVal || ""}
      rules={rules || ""}
      render={({ field }) => (
        <TextField
          {...field}
          id={`${name}-id`}
          label={label}
          variant="standard"
          fullWidth
          {...other}
        />
      )}
    />
  );
});

Input.displayName = "Input";
export default Input;
