import React, { forwardRef } from "react";
import { FormControl, InputLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

const InputNumber = forwardRef((props, ref) => {
  const {
    name,
    // label,
    control,
    onChange,
    allowNegative,
    defaultValue,
    fullWidth,
    hide = false,
    ...others
  } = props;
  // const defVal = parseFloat(control._formValues[name]) || 0;
  let defVal = 0;
  if (name.includes("[")) {
    const core = name.split("[")[0];
    const index = name.split("[")[1].split("]")[0];
    const obj = name.split(".")[1];
    // console.log(core, index, obj);
    defVal = parseFloat(control._getWatch()[core][index][obj]);
  } else {
    defVal = parseFloat(control._getWatch()[name]);
  }
  // console.log(name, control._getWatch()[name]);
  const MAX_VAL = 99999999999;
  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= MAX_VAL) return true;
    return false;
  };
  return (
    !hide && (
      <Controller
        key={`${name}-controller`}
        name={name}
        control={control}
        // defaultValue={defVal || 0}
        defaultValue={defVal || 0}
        render={({ field: { name, value } }) => (
          <NumberFormat
            // {...props}
            key={`${name}-textfield`}
            id={name}
            value={value}
            // value={defVal || 0}
            // inputRef={ref}
            // defaultValue={defVal || 0}
            // defaultValue={defVal || defaultValue || 0}
            customInput={TextField}
            // label={label || ""}
            variant="standard"
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={15}
            allowNegative={allowNegative || false}
            onValueChange={onChange}
            // onValueChange={(v) => props.onChange(v.value)}
            allowLeadingZeros={false}
            inputProps={{
              style: { textAlign: "right" },
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            // isNumericString={true}
            isAllowed={withValueCap}
            fullWidth={true}
            {...others}
          />
        )}
        // <NumberFormat
        //   // {...props}
        //   key={`${name}-textfield`}
        //   id={name}
        //   value={value}
        //   // value={defVal || 0}
        //   inputRef={ref}
        //   // defaultValue={defVal || 0}
        //   // defaultValue={defVal || defaultValue || 0}
        //   customInput={TextField}
        //   label={label || ""}
        //   variant={label ? "outlined" : 'standard'}
        //   decimalSeparator=","
        //   thousandSeparator="."
        //   decimalScale={15}
        //   allowNegative={allowNegative || false}
        //   onValueChange={onChange}
        //   // onValueChange={(v) => props.onChange(v.value)}
        //   allowLeadingZeros={false}
        //   inputProps={{
        //     style: { textAlign: "right" },
        //   }}
        //   onFocus={(e) => {
        //     e.target.select();
        //   }}
        //   // isNumericString={true}
        //   isAllowed={withValueCap}
        //   fullWidth={true}
        //   {...others}
        // />
        /* as={<NumberFormat
    // {...props}
    key={`${name}-textfield`}
    // value={defVal || 0}
    // defaultValue={defVal || 0}
    // defaultValue={defVal || defaultValue || 0}
    customInput={TextField}
    label={label || ""}
    variant="outlined"
    decimalSeparator=","
    thousandSeparator="."
    decimalScale={15}
    allowNegative={allowNegative || false}
    // onValueChange={onChange}
    onValueChange={(v) => props.onChange(v.value)}
    allowLeadingZeros={false}
    inputProps={{
        style: { textAlign: "right" }
    }}
    onFocus={(e) => {
        e.target.select();
    }}
    // isNumericString={true}
    {...others}
/>
} */
      />
    )
  );
});

InputNumber.displayName = "InputNumber";
export default InputNumber;
