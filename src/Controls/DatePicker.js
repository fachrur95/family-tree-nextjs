import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiDatePicker from "@mui/lab/DatePicker";

const DatePicker = forwardRef((props, ref) => {
  const { name, label, value, onChange, fullWidth, ...others } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        autoOk
        disableToolbar
        ref={ref}
        variant="inline"
        inputVariant="outlined"
        name={name}
        label={label}
        value={value}
        format="MM/dd/yyyy"
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth={true} size="small" />
        )}
        {...others}
      />
    </LocalizationProvider>
  );
});

DatePicker.displayName = "DatePicker";
export default DatePicker;
