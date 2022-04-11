import React, { forwardRef, useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getFillPolicyStores,
  getFillPolicyWarehouses,
} from "../../Configs/_redux/actions/fillAutocompleteActions";

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

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

const MultipleSelections = forwardRef((props, ref) => {
  const { name, label, selected, onChange, dispatch, size, ...others } = props;

  const [data, setData] = useState([]);

  const { warehouseList, storeList } = useSelector(({ fillData }) => ({
    warehouseList: fillData.getFillPolicyWarehouses,
    storeList: fillData.getFillPolicyStores,
  }));

  useEffect(() => {
    let active = true;
    (async () => {
      if (name === "warehouse")
        await dispatch(getFillPolicyWarehouses("", 0, 100, [], name));

      if (name === "store")
        await dispatch(getFillPolicyStores("", 0, 100, [], name));
      if (!active) {
        return;
      }
    })();
    return () => {
      active = false;
    };
  }, [dispatch, name]);

  useEffect(() => {
    if (warehouseList) {
      if (name === "warehouse") setData(warehouseList.data);
    }
    if (storeList) {
      if (name === "store") setData(storeList.data);
    }
  }, [warehouseList, storeList, name]);

  return (
    <div ref={ref}>
      {/* <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || false}
        render={({ field: { value } }) => ( */}
      <FormControl fullWidth={true}>
        <InputLabel id="demo-multiple-checkbox-label" size={size || "small"}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) =>
            selected
              .map(
                (obj) => data[data.findIndex((i) => i.id === obj)]?.Description
              )
              .join(", ")
          }
          MenuProps={MenuProps}
          size={size || "small"}
          {...others}
        >
          {data?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              <Checkbox checked={selected.indexOf(item.id) > -1} />
              <ListItemText primary={item.Description} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* //   )} */}
      {/* // /> */}
    </div>
  );
});

MultipleSelections.displayName = "MultipleSelections";
export default MultipleSelections;
