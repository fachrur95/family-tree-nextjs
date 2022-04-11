import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiDatePicker from "@mui/lab/DatePicker";

const MonthPicker = forwardRef((props, ref) => {
  const { name, label, value, onChange, fullWidth, ...others } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        views={["year", "month"]}
        label="Year and Month"
        // minDate={new Date('2012-03-01')}
        // maxDate={new Date('2023-06-01')}
        value={value}
        onChange={onChange}
        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
            size="small"
            helperText={null}
          />
        )}
        {...others}
      />
    </LocalizationProvider>
  );
});

MonthPicker.displayName = "MonthPicker";
export default MonthPicker;
