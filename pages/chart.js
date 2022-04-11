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
import { useQuery } from "react-query";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
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
  Visibility,
} from "@mui/icons-material";
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

const datax = {
  info: "blablabla",
  fams: [
    {
      children: ["5", "6", "7", "8"],
      husb: "1",
      id: "1",
      marriage: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      wife: "2",
    },
    {
      children: ["9", "10", "11"],
      husb: "3",
      id: "2",
      marriage: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      wife: "4",
    },
    {
      children: ["12"],
      husb: "5",
      id: "3",
      marriage: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sukorejo",
      },
      wife: "9",
    },
  ],
  indis: [
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "",
      fams: ["1"],
      firstName: "musleh",
      id: "1",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "",
      fams: ["1"],
      firstName: "badariya",
      id: "2",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "",
      fams: ["2"],
      firstName: "syawal",
      id: "3",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "",
      fams: ["2"],
      firstName: "juhara",
      id: "4",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "1",
      fams: ["3"],
      firstName: "fachrur razi",
      id: "5",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "1",
      fams: [],
      firstName: "fiqhi hikami",
      id: "6",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "pekanbaru",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "1",
      fams: [],
      firstName: "imam haris",
      id: "7",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "pekanbaru",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "1",
      fams: [],
      firstName: "rafiqatul inayah",
      id: "8",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "2",
      fams: ["3"],
      firstName: "fitri handayani",
      id: "9",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "subang",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "2",
      fams: [],
      firstName: "firda apriani",
      id: "10",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "subang",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "2",
      fams: [],
      firstName: "farhatus zakiya",
      id: "11",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: { day: 5, month: 4, year: 2022 },
        place: "karawang",
      },
      death: {
        confirmed: false,
        date: { day: null, month: null, year: null },
        place: null,
      },
      famc: "3",
      fams: [],
      firstName: "fiqhur reyhan ar-razi",
      id: "12",
      lastName: "",
      sex: "M",
    },
  ],
};

const data2 = {
  info: "blablabla",
  fams: [
    {
      children: ["3", "4", "5", "6", "7", "8", "9", "10"],
      husb: "1",
      id: "1",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "2",
    },
    {
      children: ["21", "22", "23", "24"],
      husb: "3",
      id: "2",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "11",
    },
    {
      children: ["25", "26", "27"],
      husb: "4",
      id: "3",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "12",
    },
    {
      children: ["28", "29", "30", "31", "32"],
      husb: "5",
      id: "4",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "13",
    },
    {
      children: ["33", "34", "35", "36"],
      husb: "6",
      id: "5",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "14",
    },
    {
      children: ["37", "38", "39"],
      husb: "7",
      id: "6",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "15",
    },
    {
      children: ["40", "41", "42"],
      husb: "8",
      id: "7",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "16",
    },
    {
      children: ["43", "44"],
      husb: "9",
      id: "8",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "17",
    },
    {
      husb: "13",
      id: "9",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "18",
    },
    {
      children: ["45", "46"],
      husb: "10",
      id: "10",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "19",
    },
    {
      husb: "10",
      id: "11",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "20",
    },
    {
      children: ["62", "63"],
      husb: "21",
      id: "12",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "47",
    },
    {
      children: ["64", "65", "66", "67"],
      husb: "22",
      id: "13",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "49",
    },
    {
      children: ["68"],
      husb: "23",
      id: "14",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "50",
    },
    {
      children: ["69", "70"],
      husb: "25",
      id: "15",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "51",
    },
    {
      children: ["71"],
      husb: "28",
      id: "16",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "52",
    },
    {
      children: ["72"],
      husb: "29",
      id: "17",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "53",
    },
    {
      children: ["73", "74"],
      husb: "30",
      id: "18",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "54",
    },
    {
      children: ["75", "76"],
      husb: "31",
      id: "19",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "55",
    },
    {
      children: ["77", "78", "79", "80"],
      husb: "33",
      id: "20",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "56",
    },
    {
      husb: "34",
      id: "21",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "57",
    },
    {
      husb: "35",
      id: "22",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "58",
    },
    {
      husb: "36",
      id: "23",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "59",
    },
    {
      children: ["81"],
      husb: "37",
      id: "24",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "60",
    },
    {
      children: ["82"],
      husb: "45",
      id: "25",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "61",
    },
    {
      children: ["58"],
      husb: "83",
      id: "26",
      marriage: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      wife: "84",
    },
  ],
  indis: [
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["1"],
      firstName:
        "KH. FADHOLI ASMUNI\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "1",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["1"],
      firstName:
        "Ny. Hj. Ukhrowiyah\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "2",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["2"],
      firstName: "1. Hasbullah Fadholi\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "3",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["3"],
      firstName: "2. Saifur Rijal\r\n\r\n\r\n",
      id: "4",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["4"],
      firstName: "3. Siti Muti'ah Fadholi\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "5",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["5"],
      firstName: "4.Fatimatus Zahroh Fadholi\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "6",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "pekanbaru",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["6"],
      firstName: "4. Imam Asy'ari\r\n\r\n",
      id: "7",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "pekanbaru",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["7"],
      firstName: "5. Subhan Efendi\r\n\r\n",
      id: "8",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "sumenep",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["8"],
      firstName: "6. Ali Mas'udi\r\n\r\n",
      id: "9",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "subang",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "1",
      fams: ["10"],
      firstName: "7. Sumailah Fadholi\r\n\r\n",
      id: "10",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "subang",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["2"],
      firstName: "1. Siti Suhaimi\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "11",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: 5,
          month: 4,
          year: 2022,
        },
        place: "karawang",
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["3"],
      firstName: "1. Husnul Hotimah\r\n\r\n\r\n",
      id: "12",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["9"],
      firstName: "1. Ali Maksum",
      id: "13",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["5"],
      firstName: "1. Sufyan\r\n\r\n\r\n\r\n\r\n\r\n",
      id: "14",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["6"],
      firstName: "1. Nur Holifah\r\n\r\n",
      id: "15",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["7"],
      firstName: "1. Musrifah\r\n\r\n",
      id: "16",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["8"],
      firstName: "1. Ruqoyyah\r\n",
      id: "17",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["9"],
      firstName: "2. Moslimah",
      id: "18",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["10"],
      firstName: "1. K. Idris\r\n",
      id: "19",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["11"],
      firstName: "2. Syafi'i",
      id: "20",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "2",
      fams: ["12"],
      firstName: "Rif'atus saadah\r\n\r\n",
      id: "21",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "2",
      fams: ["13"],
      firstName: "Fifin\r\n\r\n\r\n",
      id: "22",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "2",
      fams: ["14"],
      firstName: "Afifurrahman",
      id: "23",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "2",
      fams: [],
      firstName: "Fida",
      id: "24",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "3",
      fams: ["15"],
      firstName: "Wimatus Sholihah\r\n",
      id: "25",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "3",
      fams: [],
      firstName: "Chairil",
      id: "26",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "3",
      fams: [],
      firstName: "Miftah",
      id: "27",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "4",
      fams: ["16"],
      firstName: "Yatul",
      id: "28",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "4",
      fams: ["17"],
      firstName: "Yatin (almh)",
      id: "29",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "4",
      fams: ["18"],
      firstName: "Zaitun\r\n",
      id: "30",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "4",
      fams: ["19"],
      firstName: "Anis\r\n",
      id: "31",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "4",
      fams: [],
      firstName: "Farhan",
      id: "32",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "5",
      fams: ["20"],
      firstName: "Fahrur Rozi\r\n\r\n\r\n",
      id: "33",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "5",
      fams: ["21"],
      firstName: "Farid Mawardi",
      id: "34",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "5",
      fams: ["22"],
      firstName: "Fardanuddin Sufyan",
      id: "35",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "5",
      fams: ["23"],
      firstName: "Anna Fifit Rotin",
      id: "36",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "6",
      fams: ["24"],
      firstName: "Nia",
      id: "37",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "6",
      fams: [],
      firstName: "ain",
      id: "38",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "6",
      fams: [],
      firstName: "Fathi",
      id: "39",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "7",
      fams: [],
      firstName: "Rizki",
      id: "40",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "7",
      fams: [],
      firstName: "Rizal",
      id: "41",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "7",
      fams: [],
      firstName: "Faqih",
      id: "42",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "8",
      fams: [],
      firstName: "Zaim",
      id: "43",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "8",
      fams: [],
      firstName: "Azam",
      id: "44",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "10",
      fams: ["25"],
      firstName: "Aini",
      id: "45",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "10",
      fams: [],
      firstName: "Dyah",
      id: "46",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["12"],
      firstName: "abdurrahman (cerai)\r\n",
      id: "47",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: [],
      firstName: "Ainur Rofek",
      id: "48",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["13"],
      firstName: "Suherman\r\n\r\n\r\n",
      id: "49",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["14"],
      firstName: "fulanah",
      id: "50",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["15"],
      firstName: "A. Fauzan\r\n",
      id: "51",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["16"],
      firstName: "Nasihen",
      id: "52",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["17"],
      firstName: "syafii",
      id: "53",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["18"],
      firstName: "Khairuddin\r\n",
      id: "54",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["19"],
      firstName: "hartono\r\n",
      id: "55",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["20"],
      firstName: "Uswatun Hasanah\r\n\r\n\r\n",
      id: "56",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["21"],
      firstName: "Chamidah",
      id: "57",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "26",
      fams: ["22"],
      firstName: "Nur Romlah",
      id: "58",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["23"],
      firstName: "Shafwan",
      id: "59",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["24"],
      firstName: "Iqbal",
      id: "60",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["25"],
      firstName: "Ahis",
      id: "61",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "12",
      fams: [],
      firstName: "Fatihul Haq",
      id: "62",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "12",
      fams: [],
      firstName: "Nada",
      id: "63",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "13",
      fams: [],
      firstName: "Izza",
      id: "64",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "13",
      fams: [],
      firstName: "Najwa",
      id: "65",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "13",
      fams: [],
      firstName: "Azhar",
      id: "66",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "13",
      fams: [],
      firstName: "Faris",
      id: "67",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "14",
      fams: [],
      firstName: "Fulan 3",
      id: "68",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "15",
      fams: [],
      firstName: "Nuro",
      id: "69",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "15",
      fams: [],
      firstName: "Malika",
      id: "70",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "16",
      fams: [],
      firstName: "Lia",
      id: "71",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "17",
      fams: [],
      firstName: "Ilham",
      id: "72",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "18",
      fams: [],
      firstName: "baroroh",
      id: "73",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "18",
      fams: [],
      firstName: "adiba",
      id: "74",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "19",
      fams: [],
      firstName: "alif",
      id: "75",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "19",
      fams: [],
      firstName: "alya",
      id: "76",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "20",
      fams: [],
      firstName: "Fahkim",
      id: "77",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "20",
      fams: [],
      firstName: "Fahri",
      id: "78",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "20",
      fams: [],
      firstName: "Fathir",
      id: "79",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "20",
      fams: [],
      firstName: "Fawaid",
      id: "80",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "24",
      fams: [],
      firstName: "jasmin",
      id: "81",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "25",
      fams: [],
      firstName: "Fulanah 4",
      id: "82",
      lastName: "",
      sex: "F",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["26"],
      firstName: "bapak romlah",
      id: "83",
      lastName: "",
      sex: "M",
    },
    {
      birth: {
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      death: {
        confirmed: false,
        date: {
          day: null,
          month: null,
          year: null,
        },
        place: null,
      },
      famc: "",
      fams: ["26"],
      firstName: "ibu romlah",
      id: "84",
      lastName: "",
      sex: "M",
    },
  ],
};

const getChart = async () => {
  const URL = " http://localhost:4321/api/chart";
  const result = await fetch(URL);
  return await result.json();
};

// const zoomed = (size, event) => {
//   const parent = select('#svgContainer').node();

//   const scale = event.transform.k;
//   const offsetX = max([0, (parent.clientWidth - size[0] * scale) / 2]);
//   const offsetY = max([0, (parent.clientHeight - size[1] * scale) / 2]);
//   select('#chartSvg')
//     .attr('width', size[0] * scale)
//     .attr('height', size[1] * scale)
//     .attr('transform', `translate(${offsetX}, ${offsetY})`);
//   select('#chart').attr('transform', `scale(${scale})`);

//   parent.scrollLeft = -event.transform.x;
//   parent.scrollTop = -event.transform.y;
// }

// const scrolled = () => {
//   const parent = select('#svgContainer').node();
//   const x = parent.scrollLeft + parent.clientWidth / 2;
//   const y = parent.scrollTop + parent.clientHeight / 2;
//   const scale = zoomTransform(parent).k;
//   select(parent).call(zoom().translateTo, x / scale, y / scale);
// }

// const getStrippedSvg = () => {
//   const svg = document.getElementById('chartSvg')?.cloneNode(true);

//   svg.removeAttribute('transform');
//   const parent = select('#svgContainer').node();
//   const scale = zoomTransform(parent).k;
//   svg.setAttribute('width', String(Number(svg.getAttribute('width')) / scale));
//   svg.setAttribute(
//     'height',
//     String(Number(svg.getAttribute('height')) / scale),
//   );
//   svg.querySelector('#chart')?.removeAttribute('transform');

//   return svg;
// }

// const getSvgContents = () => {
//   return new XMLSerializer().serializeToString(getStrippedSvg());
// }

// class ChartWrapper {
//   zoom(factor) {
//     const parent = select('#svgContainer');
//     this.zoomBehavior?.scaleBy(parent, factor);
//   }

//   /**
//    * Renders the chart or performs a transition animation to a new state.
//    * If indiInfo is not given, it means that it is the initial render and no
//    * animation is performed.
//    */
//   renderChart(
//     props,
//     // intl,
//     args = {
//       initialRender: false,
//       resetPosition: false,
//     },
//   ) {
//     // Wait for animation to finish if animation is in progress.
//     if (!args.initialRender && this.animating) {
//       this.rerenderRequired = true;
//       this.rerenderProps = props;
//       this.rerenderResetPosition = args.resetPosition;
//       return;
//     }

//     // Freeze changing selection after initial rendering.
//     // if (!args.initialRender && props.freezeAnimation) {
//     //   return;
//     // }

//     if (args.initialRender) {
//       (select('#chart').node()).innerHTML = '';
//       this.chart = createChart({
//         // json: props.data,
//         json: data2,
//         // chartType: getChartType(props.chartType),
//         // renderer: getRendererType(props.chartType),
//         chartType: KinshipChart,
//         renderer: DetailedRenderer,
//         svgSelector: '#chart',
//         // indiCallback: (info) => props.onSelection(info),
//         // colors: chartColors.get(props.colors),
//         animate: true,
//         updateSvgSize: false,
//         // locale: intl.locale,
//       });
//     } else {
//       this.chart?.setData(props.data);
//     }
//     // const chartInfo = this.chart?.render({
//     //   startIndi: props.selection.id,
//     //   baseGeneration: props.selection.generation,
//     // });
//     const chartInfo = this.chart?.render();
//     const svg = select('#chartSvg');
//     const parent = select('#svgContainer').node();

//     const scale = zoomTransform(parent).k;
//     const zoomOutFactor = min([
//       1,
//       scale,
//       parent.clientWidth / chartInfo.size[0],
//       parent.clientHeight / chartInfo.size[1],
//     ]);
//     const extent = [max([0.1, zoomOutFactor]), 2];

//     this.zoomBehavior = zoom()
//       .scaleExtent(extent)
//       .translateExtent([[0, 0], chartInfo.size])
//       .on('zoom', (event) => zoomed(chartInfo.size, event));
//     select(parent).on('scroll', scrolled).call(this.zoomBehavior);

//     const scrollTopTween = (scrollTop) => {
//       return () => {
//         const i = interpolateNumber(parent.scrollTop, scrollTop);
//         return (t) => {
//           parent.scrollTop = i(t);
//         };
//       };
//     };
//     const scrollLeftTween = (scrollLeft) => {
//       return () => {
//         const i = interpolateNumber(parent.scrollLeft, scrollLeft);
//         return (t) => {
//           parent.scrollLeft = i(t);
//         };
//       };
//     };

//     const dx = parent.clientWidth / 2 - chartInfo.origin[0] * scale;
//     const dy = parent.clientHeight / 2 - chartInfo.origin[1] * scale;
//     const offsetX = max([
//       0,
//       (parent.clientWidth - chartInfo.size[0] * scale) / 2,
//     ]);
//     const offsetY = max([
//       0,
//       (parent.clientHeight - chartInfo.size[1] * scale) / 2,
//     ]);
//     const svgTransition = svg.transition().delay(200).duration(500);
//     const transition = args.initialRender ? svg : svgTransition;
//     transition
//       .attr('transform', `translate(${offsetX}, ${offsetY})`)
//       .attr('width', chartInfo.size[0] * scale)
//       .attr('height', chartInfo.size[1] * scale);
//     if (args.resetPosition) {
//       if (args.initialRender) {
//         parent.scrollLeft = -dx;
//         parent.scrollTop = -dy;
//       } else {
//         svgTransition
//           .tween('scrollLeft', scrollLeftTween(-dx))
//           .tween('scrollTop', scrollTopTween(-dy));
//       }
//     }

//     // After the animation is finished, rerender the chart if required.
//     this.animating = true;
//     chartInfo.animationPromise.then(() => {
//       this.animating = false;
//       if (this.rerenderRequired) {
//         this.rerenderRequired = false;
//         // Use `this.rerenderProps` instead of the props in scope because
//         // the props may have been updated in the meantime.
//         this.renderChart(this.rerenderProps, {
//           initialRender: false,
//           resetPosition: !!this.rerenderResetPosition,
//         });
//       }
//     });
//   }
// }

// const usePrevious = (value) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const defaultValues = {
  sex: "M",
};

const sexItems = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
  { id: "O", title: "Other" },
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
  const Viewer = useRef(null);
  const [disabled, setDisabled] = useState({
    indi: true,
    fams: true,
    child: true,
  });
  const [disabledChild, setDisabledChild] = useState({});
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState(TOOL_NONE);
  const [valueSVG, setValueSVG] = useState(INITIAL_VALUE);
  const { width, height } = useWindowSize({
    initialWidth: 400,
    initialHeight: 400,
  });
  const [size, setSize] = useState({ w: width, h: height });
  const { data, isSuccess } = useQuery("chart", getChart, {
    staleTime: 15000,
    refetchInterval: 5000,
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

  /* const chartWrapper = useRef(new ChartWrapper());
  const prevProps = usePrevious(props);
  // const intl = useIntl();

  useEffect(() => {
    chartWrapper.current.renderChart(props, {
      initialRender: true,
      resetPosition: true,
    });
  }); */

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
    } else {
      setDisabledChild({});
      if (dataIndividual) {
        console.log(dataIndividual);
        const dataIndi = {
          id: dataIndividual.id,
          fullName: dataIndividual.firstName,
          sex: dataIndividual.sex,
          birthDate: dataIndividual.birth.date.year
            ? `${dataIndividual.birth.date.year}-${dataIndividual.birth.date.month}-${dataIndividual.birth.date.day}`
            : null,
          birthPlace: dataIndividual.birth.place,
          deathDate: dataIndividual.death.date.year
            ? `${dataIndividual.death.date.year}-${dataIndividual.death.date.month}-${dataIndividual.death.date.day}`
            : null,
          deathPlace: dataIndividual.death.place,
          familyFrom: dataIndividual.famc,
          familyId: dataIndividual.fams[0],
        };
        mapValues(dataIndi, (value, key) => setValue(key, value));
      } else {
        const dataIndi = {
          id: "",
          fullName: "",
          sex: "M",
          birthDate: "",
          birthPlace: "",
          deathDate: "",
          deathPlace: "",
          familyFrom: "",
          familyId: "",
        };
        mapValues(dataIndi, (value, key) => setValue(key, value));
      }
      if (dataFamily) {
        // console.log(dataFamily)
        const dataFam = {
          id: dataFamily.id,
          marriageDate: dataFamily.marriage.date.year
            ? `${dataFamily.marriage.date.year}-${dataFamily.marriage.date.month}-${dataFamily.marriage.date.day}`
            : null,
          marriagePlace: dataFamily.marriage.place,
          fatherId: dataFamily.husb,
          motherId: dataFamily.wife,
          fatherName: dataFamily.husb_detail.firstName,
          motherName: dataFamily.wife_detail.firstName,
        };
        mapValues(dataFam, (value, key) => setValue(key, value));
      } else {
        const dataFam = {
          id: "",
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
                fullName: el.firstName,
                sex: el.sex,
                birthDate: el.birth.date.year
                  ? `${el.birth.date.year}-${el.birth.date.month}-${el.birth.date.day}`
                  : null,
                birthPlace: el.birth.place,
                deathDate: el.death.date.year
                  ? `${el.death.date.year}-${el.death.date.month}-${el.death.date.day}`
                  : null,
                deathPlace: el.death.place,
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
    isSuccess &&
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
                  <Typography>No Parent Family</Typography>
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
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => onSelectionIndi({ id: item.indiId })}
                        >
                          <Visibility />
                        </IconButton>
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
    </div>
  );
};

export default Chart;
