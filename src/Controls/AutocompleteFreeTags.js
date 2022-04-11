import React, { forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import { Chip } from "@mui/material";

const AutocompleteFreeTags = forwardRef((props, ref) => {
  const {
    control,
    name,
    baseName,
    idxName,
    secName,
    setValueForm,
    nameSearch,
    label,
    onChangeVariant,
    disabled,
    inputRef,
    rules,
    errors,
    ...others
  } = props;
  const defaultValue = control._formValues[baseName][idxName][secName] || [];
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case ",":
      case " ":
      case "-":
      case ";": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          if (!value.includes(event.target.value)) {
            setValue([...value, event.target.value]);
            setValueForm(name, [...value, event.target.value]);
            onChangeVariant();
            // control._fields[baseName][idxName][secName]._f.value = [...value, event.target.value];
          }
        }
        break;
      }
      default:
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      rules={rules || ""}
      render={(props) => {
        return (
          <Autocomplete
            ref={ref}
            multiple
            // freeSolo
            autoHighlight
            id={name}
            options={top100Films}
            getOptionLabel={(option) => option}
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
              setValueForm(name, newValue);
              onChangeVariant();
              // control._fields[baseName][idxName][secName]._f.value = newValue;
            }}
            filterSelectedOptions
            noOptionsText={"Type your own variants"}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            limitTags={3}
            renderInput={(params) => {
              params.inputProps.onKeyDown = handleKeyDown;
              return (
                <TextField
                  {...params}
                  name={nameSearch}
                  variant="outlined"
                  size="small"
                  label={label}
                  // placeholder="Type your own variants"
                  // margin="normal"
                  fullWidth
                  inputRef={inputRef}
                />
              );
            }}
            disabled={disabled || false}
            {...others}
          />
        );
      }}
    />
  );
});

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [];

AutocompleteFreeTags.displayName = "AutocompleteFreeTags";
export default AutocompleteFreeTags;
