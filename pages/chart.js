import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
} from "react-svg-pan-zoom";
import {
  createChart,
  KinshipChart,
  HourglassChart,
  RelativesChart,
  FancyChart,
  DetailedRenderer,
} from "topola";
import useWindowSize from "../src/utils/windowSize";
import { Box } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Collapse,
  Zoom,
  Fab,
  useTheme,
} from "@mui/material";
import BottomDrawer from "../src/components/Dialogs/bottom";
import { useFieldArray, useForm } from "react-hook-form";
import Controls from "../src/Controls/Controls";
import { mapValues } from "lodash";
import {
  Add,
  CircleOutlined,
  Female,
  Male,
  Remove,
  Save,
  Visibility,
} from "@mui/icons-material";
import NewPerson from "../src/Forms/NewPerson";
import { useSnackbar } from "notistack";
/* import { interpolateNumber } from "d3-interpolate";
import { IntlShape, useIntl } from "react-intl";
import { max, min } from "d3-array";
import { Media } from "../src/utils/media";
// import { saveAs } from 'file-saver';
import { select, Selection } from "d3-selection";
import "d3-transition";
import {
  D3ZoomEvent,
  zoom,
  ZoomBehavior,
  ZoomedElementBaseType,
  zoomTransform,
} from "d3-zoom"; */

const ZOOM_FACTOR = 1.3;

const getChart = async () => {
  const URL = " http://localhost:4321/api/chart";
  const result = await fetch(URL);
  return await result.json();
};

const submitData = async (data) => {
  if (data.id) {
    const url = `/api/chart?id=${data.id}&parentId=0`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("An error has occured");
    }
    return await response.json();
  } else if (data.parentId) {
    const url = `/api/chart?id=0&parentId=${data.parentId}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("An error has occured");
    }
    return await response.json();
  }
};

const fabStyle = {
  position: "fixed",
  bottom: 530,
  right: 25,
  zIndex: (theme) => theme.zIndex.drawer + 2,
};

const defaultValues = {
  sex: "M",
};

const sexItems = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
  // { id: "O", title: "Other" },
];

const tempChildren = {
  indiId: "",
  fullName: "",
  sex: "",
  birthDate: null,
  birthPlace: "",
  deathDate: null,
  deathPlace: "",
};

const Item = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        // p: 1,
        m: 1,
        // bgcolor: (theme) =>
        //   theme.palette.mode === "dark" ? "#101010" : "grey.100",
        // color: (theme) =>
        //   theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        // border: "1px solid",
        // borderColor: (theme) =>
        //   theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        // borderRadius: 2,
        // fontSize: "0.875rem",
        // fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
};

const Chart = () => {
  const theme = useTheme();
  const Viewer = useRef(null);
  const [disabled, setDisabled] = useState({
    indi: true,
    fams: true,
    child: true,
  });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [openNewPerson, setOpenNewPerson] = useState(false);
  const [dataNewPerson, setDataNewPerson] = useState(null);
  const [disabledChild, setDisabledChild] = useState({});
  const [openCollapse, setOpenCollapse] = useState(false);
  const [optionMen, setOptionCoupleMen] = useState([]);
  const [optionWomen, setOptionWomen] = useState([]);
  const [typeAddNew, setTypeAddNew] = useState("");
  const [menSelected, setMenSelected] = useState(null);
  const [womenSelected, setWomenSelected] = useState(null);
  const [coupleSelected, setCoupleSelected] = useState(null);
  const [errData, setErrData] = useState("");
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState(TOOL_NONE);
  const [valueSVG, setValueSVG] = useState(INITIAL_VALUE);
  const { width, height } = useWindowSize({
    initialWidth: 400,
    initialHeight: 400,
  });
  const [size, setSize] = useState({ w: width, h: height });
  const { data, isSuccess } = useQuery("chart", getChart, {
    // staleTime: 15000,
    // refetchInterval: 5000,
  });
  const [dataIndividual, setDataIndividual] = useState(null);
  const [dataFamily, setDataFamily] = useState(null);
  const [dataChildren, setDataChildren] = useState(null);
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

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

  const onSelectionIndi = useCallback(
    (selection) => {
      const families = data?.fams || [];
      const individuals = data?.indis || [];
      const id = selection.id;
      const objIndi = individuals.find((el) => el.id === id);
      const idParent = objIndi.famc;
      const objFams = families.find((el) => el.id === idParent);
      const idFather = objFams?.husb;
      const idMother = objFams?.wife;
      const objFather = individuals.find((el) => el.id === idFather);
      const objMother = individuals.find((el) => el.id === idMother);
      if (objFather && objMother) {
        objFams.husb_detail = objFather || null;
        objFams.wife_detail = objMother || null;
      }
      const idFamsCouple = objIndi.fams[0];
      const objFamsCouple = families.find((el) => el.id === idFamsCouple);
      const idCouple =
        objFamsCouple?.husb === id ? objFamsCouple?.wife : objFamsCouple?.husb;
      const objCouple = individuals.find((el) => el.id === idCouple) || null;
      setDataIndividual({
        ...objIndi,
        couple: { ...objFamsCouple, couple_detail: objCouple },
      });
      setDataFamily(objFams);
      setDataChildren(null);
      objIndi && setOpen(true);
      setDisabled({ ...disabled, fams: true, indi: false });
    },
    [data, disabled]
  );
  const onSelectionFam = useCallback(
    (selection) => {
      const families = data?.fams || [];
      const individuals = data?.indis || [];
      const id = selection.id;
      const objFams = families.find((el) => el.id === id);
      const idFather = objFams?.husb;
      const idMother = objFams?.wife;
      const arrChild = objFams?.children;
      const objFather = individuals.find((el) => el.id === idFather);
      const objMother = individuals.find((el) => el.id === idMother);
      const arrChildren =
        arrChild?.map((item) => individuals.find((el) => el.id === item)) || [];
      if (objFather && objMother) {
        objFams.husb_detail = objFather || null;
        objFams.wife_detail = objMother || null;
      }
      setDataIndividual(null);
      setDataFamily(objFams);
      setDataChildren(arrChildren);
      objFams && setOpen(true);
      setDisabled({ ...disabled, indi: true, fams: false });
    },
    [data, disabled]
  );

  const handleChangeSexLine = (name, value) => {
    const nextValue = value === "O" ? "M" : value === "M" ? "F" : "O";
    setValue(name, nextValue);
  };

  const onSubmit = async (data) => {
    console.log(data);
    await mutation.mutate(data);
  };

  // const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1);
  // const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200);
  // const _fitToViewer1 = () => Viewer.current.fitToViewer();

  // /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
  // const _zoomOnViewerCenter2 = () => setValueSVG(zoomOnViewerCenter(value, 1.1));
  // const _fitSelection2 = () => setValueSVG(fitSelection(value, 40, 40, 200, 200));
  // const _fitToViewer2 = () => setValueSVG(fitToViewer(value));

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  useEffect(() => {
    if (!open) {
      setDataIndividual(null);
      setDataFamily(null);
      setMenSelected(null);
      setWomenSelected(null);
      setCoupleSelected(null);
    } else {
      setDisabledChild({});
      if (dataIndividual) {
        // console.log(dataIndividual);
        const dataIndi = {
          id: dataIndividual.id,
          fullName: dataIndividual.firstName || "",
          sex: dataIndividual.sex,
          birthDate: dataIndividual.birth.date.year
            ? `${dataIndividual.birth.date.year}-${dataIndividual.birth.date.month}-${dataIndividual.birth.date.day}`
            : null,
          birthPlace: dataIndividual.birth.place || "",
          deathDate: dataIndividual.death.date.year
            ? `${dataIndividual.death.date.year}-${dataIndividual.death.date.month}-${dataIndividual.death.date.day}`
            : null,
          deathPlace: dataIndividual.death.place || "",
          familyFrom: dataIndividual.famc,
          familyId: dataIndividual.fams[0] || "",
          isMarriage: dataIndividual.couple.couple_detail !== null,
          // familyCoupleId: dataIndividual.couple?.id || "",
          coupleId: dataIndividual.couple.couple_detail?.id || "",
          coupleName: dataIndividual.couple.couple_detail?.firstName || "",
          marriageDateCouple: dataIndividual.couple.marriage?.date.year
            ? `${dataIndividual.couple.marriage?.date.year}-${dataIndividual.couple.marriage?.date.month}-${dataIndividual.couple.marriage?.date.day}`
            : null,
          marriagePlaceCouple: dataIndividual.couple.marriage?.place || "",
          marriageDateNew: null,
          marriagePlaceNew: "",
          fatherIdNew: "",
          motherIdNew: "",
          fatherNameNew: "",
          motherNameNew: "",
        };
        mapValues(dataIndi, (value, key) => setValue(key, value));
        if (dataIndividual.couple.couple_detail?.id)
          setCoupleSelected({
            id: dataIndividual.couple.couple_detail?.id || "",
            firstName: dataIndividual.couple.couple_detail?.firstName || "",
          });
        setOpenCollapse(dataIndividual.couple.couple_detail !== null);
      } else {
        const dataIndi = {
          id: "",
          fullName: "",
          sex: "O",
          birthDate: "",
          birthPlace: "",
          deathDate: "",
          deathPlace: "",
          familyFrom: "",
          familyId: "",
          isMarriage: "",
          // familyCoupleId: "",
          coupleId: "",
          coupleName: "",
          marriageDateCouple: "",
          marriagePlaceCouple: "",
          marriageDateNew: null,
          marriagePlaceNew: "",
          fatherIdNew: "",
          motherIdNew: "",
          fatherNameNew: "",
          motherNameNew: "",
        };
        mapValues(dataIndi, (value, key) => setValue(key, value));
        setOpenCollapse(false);
      }
      if (dataFamily) {
        // console.log(dataFamily);
        const dataFam = {
          parentId: dataFamily.id,
          marriageDate: dataFamily.marriage.date.year
            ? `${dataFamily.marriage.date.year}-${dataFamily.marriage.date.month}-${dataFamily.marriage.date.day}`
            : null,
          marriagePlace: dataFamily.marriage.place || "",
          fatherId: dataFamily.husb,
          motherId: dataFamily.wife,
          fatherName: dataFamily.husb_detail.firstName || "",
          motherName: dataFamily.wife_detail.firstName || "",
        };
        mapValues(dataFam, (value, key) => setValue(key, value));
      } else {
        const dataFam = {
          parentId: "",
          marriageDate: "",
          marriagePlace: "",
          fatherId: "",
          motherId: "",
          fatherName: "",
          motherName: "",
        };
        mapValues(dataFam, (value, key) => setValue(key, value));
      }
      if (dataChildren) {
        // console.log(dataChildren);
        const dataChild = {
          children: dataChildren,
        };
        mapValues(dataChild, (value, key) => {
          if (key === "children") {
            const childrenData = value.map((el, i) => {
              setDisabledChild((old) => ({ ...old, [i]: true }));
              return {
                indiId: el.id,
                fullName: el.firstName || "",
                sex: el.sex,
                birthDate: el.birth.date.year
                  ? `${el.birth.date.year}-${el.birth.date.month}-${el.birth.date.day}`
                  : null,
                birthPlace: el.birth.place || "",
                deathDate: el.death.date.year
                  ? `${el.death.date.year}-${el.death.date.month}-${el.death.date.day}`
                  : null,
                deathPlace: el.death.place || "",
              };
            });
            setValue(key, childrenData);
          } else {
            setValue(key, value);
          }
        });
      } else {
        setValue("children", []);
      }
    }
  }, [open, setValue, dataIndividual, dataFamily, dataChildren]);

  useEffect(() => {
    // HourglassChart
    // RelativesChart
    // KinshipChart
    if (isSuccess) {
      createChart({
        json: data,
        chartType: KinshipChart,
        renderer: DetailedRenderer,
        svgSelector: "#chart",
        indiCallback: onSelectionIndi,
        famCallback: onSelectionFam,
        // colors: chartColors.get(props.colors!),
        animate: true,
        updateSvgSize: false,
        // horizontal: true,
        // locale: intl.locale,
      }).render();
      const filteredMen = data.indis?.filter((el) => el.sex === "M");
      const filteredWomen = data.indis?.filter((el) => el.sex === "F");
      // console.log(filteredWomen);
      setOptionCoupleMen(filteredMen);
      setOptionWomen(filteredWomen);
    }

    const chartId = document.getElementById("chart");
    const { width, height } = chartId.getBBox();
    setSize({ w: width + 50, h: height + 150 });
  }, [data, isSuccess, onSelectionIndi, onSelectionFam]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <ReactSVGPanZoom
          ref={Viewer}
          width={width - 50}
          // width={700}
          height={height - 100}
          tool={tool}
          onChangeTool={setTool}
          value={valueSVG}
          onChangeValue={setValueSVG}
          // onZoom={(e) => console.log("zoom")}
          // onPan={(e) => console.log("pan")}
          // onClick={(event) =>
          //   console.log("click", event.x, event.y, event.originalEvent)
          // }
        >
          <svg
            id="chartSvg"
            width={size.w}
            height={size.h}
            style={{ width: "100%", height: "inherit" }}
          >
            <text x="0" y="15" fill="black">
              {data?.info}
            </text>
            <g id="chart" />
          </svg>
        </ReactSVGPanZoom>
      </Box>
      <BottomDrawer open={open} setOpen={setOpen}>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Grid container spacing={1}>
            {dataIndividual && (
              <Grid component={Paper} item xs={12} sm={12} md={4} sx={{ p: 2 }}>
                <Typography>Individual Info</Typography>
                {/* <TextField label="Standard" variant="standard" /> */}
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
                  disabled={disabled.indi}
                />
                <Controls.RadioGroup
                  name="sex"
                  label="Sex"
                  color="primary"
                  items={sexItems}
                  control={control}
                  disabled={disabled.indi}
                />
                <Controls.DatePicker
                  name="birthDate"
                  label="Birth Date"
                  value={getValues("birthDate")}
                  onChange={(date) => {
                    setValue("birthDate", date);
                  }}
                  disabled={disabled.indi}
                />
                <Controls.Input
                  control={control}
                  label="Birth Place"
                  name="birthPlace"
                  disabled={disabled.indi}
                />
                <Controls.DatePicker
                  name="deathDate"
                  label="Death Date"
                  value={getValues("deathDate")}
                  onChange={(date) => {
                    setValue("deathDate", date);
                  }}
                  disabled={disabled.indi}
                />
                <Controls.Input
                  control={control}
                  label="Death Place"
                  name="deathPlace"
                  disabled={disabled.indi}
                />
                <Controls.Switch
                  name="isMarriage"
                  label="Marriage"
                  control={control}
                  disabled={disabled.indi}
                  onChange={(e, value) => {
                    setValue("isMarriage", value);
                    setOpenCollapse(value);
                  }}
                />
                <Collapse in={openCollapse}>
                  {/* {getValues("coupleId") ? (
                    <Controls.Input
                      control={control}
                      label="Couple Name"
                      name="coupleName"
                      disabled={disabled.indi}
                    />
                  ) : ( */}
                  <Controls.Autocompletes
                    control={control}
                    name="coupleId"
                    nameSearch="newCoupleSearch"
                    label="Couple"
                    options={getValues("sex") === "M" ? optionWomen : optionMen}
                    onChange={(_, data) => {
                      if (data) {
                        console.log(data);
                        if (data.id === 0) {
                          setDataNewPerson({
                            ...data,
                            sex: getValues("sex") === "M" ? "F" : "M",
                          });
                          setOpenNewPerson(true);
                        } else {
                          setCoupleSelected(data);
                          setValue("coupleId", data.id);
                        }
                      } else {
                        setCoupleSelected(null);
                        setValue("coupleId", "");
                      }
                    }}
                    dataSelected={coupleSelected}
                    addNew
                    // disabled={disabled}
                  />
                  {/* )} */}
                  <Controls.DatePicker
                    name="marriageDateCouple"
                    label="Marriage Date"
                    value={getValues("marriageDateCouple")}
                    onChange={(date) => {
                      setValue("marriageDateCouple", date);
                    }}
                    disabled={disabled.indi}
                  />
                  <Controls.Input
                    control={control}
                    label="Marriage Place"
                    name="marriagePlaceCouple"
                    disabled={disabled.indi}
                  />
                </Collapse>
              </Grid>
            )}
            <Grid component={Paper} item xs={12} sm={12} md={4} sx={{ p: 2 }}>
              {dataFamily ? (
                <>
                  <Typography>Parent Family Info</Typography>
                  <Controls.Input
                    control={control}
                    label="Father Name"
                    name="fatherName"
                    rules={{ required: true }}
                    error={errors.fatherName && true}
                    helperText={
                      errors.fatherName &&
                      (errors.fatherName?.message || "This field is required")
                    }
                    disabled={true}
                  />
                  <Controls.Input
                    control={control}
                    label="Mother Name"
                    name="motherName"
                    rules={{ required: true }}
                    error={errors.motherName && true}
                    helperText={
                      errors.motherName &&
                      (errors.motherName?.message || "This field is required")
                    }
                    disabled={true}
                  />
                  <Controls.DatePicker
                    name="marriageDate"
                    label="Marriage Date"
                    value={getValues("marriageDate")}
                    onChange={(date) => {
                      console.log(date);
                      setValue("marriageDate", date);
                    }}
                    disabled={disabled.fams}
                  />
                  <Controls.Input
                    control={control}
                    label="Marriage Place"
                    name="marriagePlace"
                    disabled={disabled.fams}
                  />
                </>
              ) : (
                <>
                  <Typography>New Parent Family</Typography>
                  <Controls.Autocompletes
                    control={control}
                    name="newFather"
                    nameSearch="newFatherSearch"
                    label="Father"
                    options={optionMen}
                    onChange={(_, data) => {
                      if (data) {
                        console.log(data);
                        if (data.id === 0) {
                          setDataNewPerson({ ...data, sex: "M" });
                          setOpenNewPerson(true);
                        } else {
                          setMenSelected(data);
                          setValue("newFather", data.id);
                        }
                      } else {
                        setMenSelected(null);
                        setValue("newFather", "");
                      }
                    }}
                    dataSelected={menSelected}
                    addNew
                    // disabled={disabled}
                  />
                  <Controls.Autocompletes
                    control={control}
                    name="newMother"
                    nameSearch="newMotherSearch"
                    label="Mother"
                    options={optionWomen}
                    onChange={(_, data) => {
                      if (data) {
                        if (data.id === 0) {
                          setDataNewPerson({ ...data, sex: "F" });
                          setOpenNewPerson(true);
                        } else {
                          setWomenSelected(data);
                          setValue("newMother", data.id);
                        }
                      } else {
                        setWomenSelected(null);
                        setValue("newMother", "");
                      }
                    }}
                    dataSelected={womenSelected}
                    addNew
                    // disabled={disabled}
                  />
                  <Controls.DatePicker
                    name="marriageDateNew"
                    label="Marriage Date"
                    value={getValues("marriageDateNew")}
                    onChange={(date) => {
                      setValue("marriageDateNew", date);
                    }}
                  />
                  <Controls.Input
                    control={control}
                    label="Marriage Place"
                    name="marriagePlaceNew"
                  />
                </>
              )}
            </Grid>
            {dataChildren && (
              <Grid component={Paper} item xs={12} sm={12} md={8} sx={{ p: 2 }}>
                <Typography>Children</Typography>
                <IconButton
                  aria-label="add"
                  color="primary"
                  onClick={() => append(tempChildren)}
                >
                  <Add />
                </IconButton>
                {fields?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // p: 1,
                      // m: 1,
                      bgcolor: "background.paper",
                      // height: 100,
                      borderRadius: 1,
                    }}
                  >
                    {/* <Item>{item.fullName}</Item> */}
                    <Item>{index + 1}</Item>
                    <Item>
                      <Controls.Input
                        label="Full Name"
                        control={control}
                        name={`children[${index}].fullName`}
                        defaultValue={item.fullName}
                        disabled={disabledChild[index]}
                      />
                    </Item>
                    <Item>
                      <Tooltip
                        title={
                          getValues(`children[${index}].sex`) === "M"
                            ? "Male"
                            : getValues(`children[${index}].sex`) === "F"
                            ? "Female"
                            : "Other"
                        }
                      >
                        <span>
                          <IconButton
                            onClick={() =>
                              handleChangeSexLine(
                                `children[${index}].sex`,
                                getValues(`children[${index}].sex`)
                              )
                            }
                            disabled={disabledChild[index]}
                          >
                            {getValues(`children[${index}].sex`) === "M" ? (
                              <Male />
                            ) : getValues(`children[${index}].sex`) === "F" ? (
                              <Female />
                            ) : (
                              <CircleOutlined />
                            )}
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Item>
                    <Item>
                      <Controls.DatePicker
                        name={`children[${index}].birthDate`}
                        label="Birth Date"
                        value={getValues(`children[${index}].birthDate`)}
                        onChange={(date) => {
                          setValue(`children[${index}].birthDate`, date);
                        }}
                        defaultValue={item.birthDate}
                        disabled={disabledChild[index]}
                      />
                    </Item>
                    <Item>
                      <Controls.Input
                        label="Birth Place"
                        control={control}
                        name={`children[${index}].birthPlace`}
                        defaultValue={item.birthPlace}
                        disabled={disabledChild[index]}
                      />
                    </Item>
                    <Item>
                      <Controls.DatePicker
                        name={`children[${index}].deathDate`}
                        label="Death Date"
                        value={getValues(`children[${index}].deathDate`)}
                        onChange={(date) => {
                          setValue(`children[${index}].deathDate`, date);
                        }}
                        defaultValue={item.deathDate}
                        disabled={disabledChild[index]}
                      />
                    </Item>
                    <Item>
                      <Controls.Input
                        label="Death Place"
                        control={control}
                        name={`children[${index}].deathPlace`}
                        defaultValue={item.deathPlace}
                        disabled={disabledChild[index]}
                      />
                    </Item>
                    <Item>
                      {disabledChild[index] ? (
                        <>
                          <IconButton
                            aria-label="view"
                            color="primary"
                            onClick={() => onSelectionIndi({ id: item.indiId })}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => {
                              remove(index);
                              fields.filter((el, i) => i !== index);
                            }}
                          >
                            <Remove />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => {
                            remove(index);
                            fields.filter((el, i) => i !== index);
                          }}
                        >
                          <Remove />
                        </IconButton>
                      )}
                    </Item>
                  </Box>
                ))}
              </Grid>
            )}
          </Grid>
        </Container>
      </BottomDrawer>
      <Zoom
        key="primary"
        in={open}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${open ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={fabStyle}
          aria-label="Save"
          color="primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          <Save />
        </Fab>
      </Zoom>
      <NewPerson
        open={openNewPerson}
        setOpen={setOpenNewPerson}
        data={dataNewPerson}
      />
    </div>
  );
};

export default Chart;
