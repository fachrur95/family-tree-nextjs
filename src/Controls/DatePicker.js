import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePicker = forwardRef((props, ref) => {
  const { name, label, value, onChange, ...others } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        // autoOk
        // disableToolbar
        ref={ref}
        // variant="inline"
        // inputVariant="outlined"
        name={name}
        label={label}
        value={value}
        // format="MM/dd/yyyy"
        onChange={onChange}
        // KeyboardButtonProps={{
        //   "aria-label": "change date",
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
            // size="small"
            variant="standard"
          />
        )}
        {...others}
      />
    </LocalizationProvider>
  );
});

DatePicker.displayName = "DatePicker";
export default DatePicker;
