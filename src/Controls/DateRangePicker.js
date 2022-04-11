import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import MuiDateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

const DateRangePicker = forwardRef((props, ref) => {
  const { name, label, value, onChange, fullWidth, ...others } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateRangePicker
        startText="Start"
        endText="End"
        value={value}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} size="small" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} size="small" />
          </React.Fragment>
        )}
        {...others}
      />
    </LocalizationProvider>
  );
});

DateRangePicker.displayName = "DateRangePicker";
export default DateRangePicker;
