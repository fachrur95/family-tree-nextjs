// /* eslint-disable */
import React, { forwardRef, useEffect, useState } from "react";
import { Autocomplete, Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const AutocompletesX = forwardRef((props, ref) => {
  const {
    control,
    name,
    nameSearch,
    label,
    onChange,
    dataSelected,
    disableClearable,
    disabled,
    optionsList,
  } = props;
  const [didMount, setDidMount] = useState(false);
  const [options, setOptions] = useState([]);
  const ListboxComponent = forwardRef(function ListboxComponentInner(
    props,
    ref
  ) {
    return (
      <ul
        ref={ref}
        id={props.id}
        className={props.className}
        onMouseDown={props.onMouseDown}
        role={props.role}
      >
        {props.children}
      </ul>
    );
  });

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);
  useEffect(() => {
    setOptions(optionsList);
  }, [optionsList]);

  if (!didMount) {
    return null;
  }

  return optionsList ? (
    <Controller
      name={name}
      control={control}
      defaultValue={
        dataSelected ? (dataSelected.id ? dataSelected.id : "") : ""
      }
      render={(props) => (
        <Autocomplete
          value={dataSelected || null}
          disableClearable={disableClearable || false}
          ListboxComponent={ListboxComponent}
          options={options}
          getOptionLabel={(option) =>
            option.Alias
              ? `${option.Description} - ${option.Alias}`
              : option.Description
          }
          onChange={onChange}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          disabled={disabled || false}
          renderInput={(params) => (
            <TextField
              {...params}
              name={nameSearch}
              label={label}
              variant="outlined"
              size="small"
              inputRef={ref}
            />
          )}
        />
      )}
    />
  ) : (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height="48px"
    />
  );
});
AutocompletesX.displayName = "AutocompletesX";
export default AutocompletesX;
