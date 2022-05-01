// /* eslint-disable */
import React, { forwardRef, useEffect, useState } from "react";
import { Autocomplete, createFilterOptions } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ButtonGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
// import { connect, useDispatch, useSelector } from "react-redux";
import Controls from "./Controls";
// import * as fnFill from "../../Configs/_redux/actions/fillAutocompleteActions";
// import * as fnFillPublic from "../../Configs/_redux/actions/publics/publicsActions";

const styles = {
  popper: {
    width: "fit-content",
  },
};

const fnFilter = createFilterOptions();

const PER_PAGE_LOAD = 150;

const Autocompletes = forwardRef((props, ref) => {
  const {
    control,
    name,
    nameSearch,
    label,
    options,
    onChange,
    dataSelected,
    disableClearable,
    secName,
    disabled,
    inputRef,
    btnSearch,
    rules,
    errors,
    onKeyUp,
    hide = false,
    addNew = false,
    required,
  } = props;
  const [didMount, setDidMount] = useState(false);
  // const [options, setOptions] = useState([]);
  // const [query, setQuery] = useState("");
  // const [page, setPage] = useState(0);
  // const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [direct, setDirect] = useState("left");

  // const dispatch = useDispatch();
  // const fillData = useSelector((state) => state.fillData);
  // const publics = useSelector((state) => state.publics);

  // const loadPrevData = () => {
  //   setDirect("right");
  //   setPage(page - 1);
  // };

  // const loadNextData = () => {
  //   setDirect("left");
  //   setPage(page + 1);
  // };

  const ListboxComponent = forwardRef(function ListboxComponentInner(
    props,
    ref
  ) {
    return (
      // <Slide direction={direct} in={!isLoading} mountOnEnter unmountOnExit>
      <ul
        ref={ref}
        id={props.id}
        className={props.className}
        onMouseDown={props.onMouseDown}
        role={props.role}
      >
        {props.children}
      </ul>
      // </Slide>
    );
  });

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  if (options === undefined) {
    return null;
  }

  return (
    !hide && (
      <Controller
        name={name}
        control={control}
        defaultValue={dataSelected ? dataSelected.id : ""}
        rules={rules || ""}
        render={(props) => (
          <Autocomplete
            ref={ref}
            id={name}
            // value={dataSelected || null}
            value={
              (options?.data?.some((item) => dataSelected.id !== item.id)
                ? options[0]
                : dataSelected) || null
            }
            // PopperComponent={PopperMy}
            disableClearable={disableClearable || false}
            ListboxComponent={ListboxComponent}
            options={options || []}
            loading={isLoading}
            getOptionLabel={(option) => {
              if (addNew) {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.firstName;
                }
              }
              return option.firstName || "";
            }}
            filterOptions={(options, params) => {
              if (addNew) {
                const filtered = fnFilter(options, params);
                if (params.inputValue !== "") {
                  filtered.push({
                    id: 0,
                    inputValue: params.inputValue,
                    firstName: `Add new "${params.inputValue}"`,
                  });
                }
                return filtered;
              } else {
                return options;
              }
            }}
            onChange={onChange}
            isOptionEqualToValue={(option, value) =>
              (option.id
                ? option.id
                : option[secName]
                ? option[secName]
                : true) ===
              (value.id ? value.id : value[secName] ? value[secName] : false)
            }
            disabled={disabled || false}
            renderInput={(params) => (
              <TextField
                {...params}
                id={nameSearch}
                name={nameSearch}
                label={label}
                fullWidth
                variant="standard"
                size="small"
                // onChange={(e) => {
                // setQuery(e.target.value);
                // setDirect("up");
                // setPage(0);
                // }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <React.Fragment>
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                        {btnSearch}
                      </React.Fragment>
                    </>
                  ),
                }}
                inputRef={inputRef}
                error={errors ? true : false}
                helperText={errors && "This field is required"}
                onKeyUp={onKeyUp}
                required={required || false}
                // {...other}
              />
            )}
          />
        )}
      />
    )
  );
});
Autocompletes.displayName = "Autocompletes";
// export default connect()(React.memo(Autocompletes));
export default Autocompletes;
