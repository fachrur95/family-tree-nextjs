import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FormUtils from "../Components/FormUtils";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Controls from "../Controls/Controls";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

const defaultValues = {
  id: "",
  fullName: "",
  sex: "M",
  birthDate: null,
  birthPlace: "",
  deathDate: null,
  deathPlace: "",
};

const sexItems = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
];

const submitData = async (data) => {
  const url = `/api/chart`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("An error has occured");
  }
  return await response.json();
};

const NewPerson = (props) => {
  const { open, setOpen, data, ...other } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [disabled, setDisabled] = useState(false);
  const [errData, setErrData] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const mutation = useMutation(submitData, {
    onMutate: async (newData) => {
      // mutation in-progress
      // use for : spinner, disabled form,etc
      // Optimistic Update :
      // 1. cancel any outgoing refetch
      // await queryClient.cancelQueries("chart");
      // // 2. snapshot the previous value
      // const previousDatas = queryClient.getQueryData("chart");
      // console.log(previousDatas);
      // // 3. optimistically update new value
      // if (previousDatas) {
      //   newData = { ...newData, createdAt: new Date().toISOString() };
      //   const finalData = [...previousDatas, newData];
      //   queryClient.setQueryData("chart", finalData);
      // }
      // return { previousDatas };
    },
    onSettled: async (data, error) => {
      // mutation done --> success, error
      if (data) {
        await queryClient.invalidateQueries("chart");
        setErrData("");
      }

      if (error) {
        setErrData(error.message);
      }
    },
    onError: async (error, _variables, context) => {
      // mutation done with error response
      setErrData(error.message);
      enqueueSnackbar(error.message || "Error", { persist: false });
      if (context?.previousDatas) {
        queryClient.setQueryData("chart", context.previousDatas);
      }
    },
    onSuccess: async (res) => {
      // mutation done with success response
      setOpen(false);
      enqueueSnackbar(res.message || "Success", { persist: false });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    await mutation.mutate(data);
  };

  useEffect(() => {
    if (open && data?.inputValue) {
      setValue("fullName", data?.inputValue);
      setValue("sex", data?.sex);
    } else {
      reset(defaultValues);
    }
  }, [open, data, reset]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add New Person</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
        <FormUtils sx={{ pt: 1 }}>
          <Grid container spacing={1}>
            <Typography>Individual Info</Typography>
            <Controls.Input
              control={control}
              label="Full Name"
              name="fullName"
              rules={{ required: true }}
              error={errors.fullName && true}
              helperText={
                errors.fullName &&
                (errors.fullName?.message || "This field is required")
              }
              disabled={disabled}
            />
            <Controls.RadioGroup
              name="sex"
              label="Sex"
              color="primary"
              items={sexItems}
              control={control}
              disabled={disabled}
            />
            <Controls.DatePicker
              name="birthDate"
              label="Birth Date"
              value={getValues("birthDate")}
              onChange={(date) => {
                setValue("birthDate", date);
              }}
              disabled={disabled}
            />
            <Controls.Input
              control={control}
              label="Birth Place"
              name="birthPlace"
              disabled={disabled}
            />
            <Controls.DatePicker
              name="deathDate"
              label="Death Date"
              value={getValues("deathDate")}
              onChange={(date) => {
                setValue("deathDate", date);
              }}
              disabled={disabled}
            />
            <Controls.Input
              control={control}
              label="Death Place"
              name="deathPlace"
              disabled={disabled}
            />
          </Grid>
        </FormUtils>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
        <Button onClick={() => handleSubmit(onSubmit)()} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPerson;
