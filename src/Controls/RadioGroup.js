import React, { forwardRef } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

const RadioGroup = forwardRef((props, ref) => {
  const { name, label, items, color, control, disabled } = props;
  return (
    <div ref={ref}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <MuiRadioGroup
              row
              value={value}
              onBlur={onBlur}
              onChange={(e) => onChange(e)}
            >
              {items.map((item) => (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio color={color} />}
                  label={item.title}
                  disabled={disabled || false}
                />
              ))}
            </MuiRadioGroup>
          )}
        />
      </FormControl>
    </div>
  );
});

RadioGroup.displayName = "RadioGroup";
export default RadioGroup;
