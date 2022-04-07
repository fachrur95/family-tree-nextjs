import React, { useEffect, useRef } from 'react'
import {
  createChart,
  KinshipChart,
  HourglassChart,
  RelativesChart,
  FancyChart,
  DetailedRenderer
} from 'topola'
import { interpolateNumber } from 'd3-interpolate';
import { IntlShape, useIntl } from 'react-intl';
import { max, min } from 'd3-array';
import { Media } from '../src/utils/media';
// import { saveAs } from 'file-saver';
import { select, Selection } from 'd3-selection';
import 'd3-transition';
import {
  D3ZoomEvent,
  zoom,
  ZoomBehavior,
  ZoomedElementBaseType,
  zoomTransform,
} from 'd3-zoom';

const ZOOM_FACTOR = 1.3;

const data = {
  "info": "blablabla",
  "fams": [
    {
      "children": ["5", "6", "7", "8"],
      "husb": "1",
      "id": "1",
      "marriage": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "wife": "2"
    },
    {
      "children": ["9", "10", "11"],
      "husb": "3",
      "id": "2",
      "marriage": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "wife": "4"
    },
    {
      "children": ["12"],
      "husb": "5",
      "id": "3",
      "marriage": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sukorejo"
      },
      "wife": "9"
    }
  ],
  "indis": [
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "",
      "fams": ["1"],
      "firstName": "musleh",
      "id": "1",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "",
      "fams": ["1"],
      "firstName": "badariya",
      "id": "2",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "",
      "fams": ["2"],
      "firstName": "syawal",
      "id": "3",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "",
      "fams": ["2"],
      "firstName": "juhara",
      "id": "4",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "1",
      "fams": ["3"],
      "firstName": "fachrur razi",
      "id": "5",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "1",
      "fams": [],
      "firstName": "fiqhi hikami",
      "id": "6",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "pekanbaru"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "1",
      "fams": [],
      "firstName": "imam haris",
      "id": "7",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "pekanbaru"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "1",
      "fams": [],
      "firstName": "rafiqatul inayah",
      "id": "8",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "2",
      "fams": ["3"],
      "firstName": "fitri handayani",
      "id": "9",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "subang"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "2",
      "fams": [],
      "firstName": "firda apriani",
      "id": "10",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "subang"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "2",
      "fams": [],
      "firstName": "farhatus zakiya",
      "id": "11",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": { "day": 5, "month": 4, "year": 2022 },
        "place": "karawang"
      },
      "death": {
        "confirmed": false,
        "date": { "day": null, "month": null, "year": null },
        "place": null
      },
      "famc": "3",
      "fams": [],
      "firstName": "fiqhur reyhan ar-razi",
      "id": "12",
      "lastName": "",
      "sex": "M"
    }
  ]
}

const data2 = {
  "info": "blablabla",
  "fams": [
    {
      "children": [
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ],
      "husb": "1",
      "id": "1",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "2"
    },
    {
      "children": [
        "21",
        "22",
        "23",
        "24"
      ],
      "husb": "3",
      "id": "2",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "11"
    },
    {
      "children": [
        "25",
        "26",
        "27"
      ],
      "husb": "4",
      "id": "3",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "12"
    },
    {
      "children": [
        "28",
        "29",
        "30",
        "31",
        "32"
      ],
      "husb": "5",
      "id": "4",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "13"
    },
    {
      "children": [
        "33",
        "34",
        "35",
        "36"
      ],
      "husb": "6",
      "id": "5",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "14"
    },
    {
      "children": [
        "37",
        "38",
        "39"
      ],
      "husb": "7",
      "id": "6",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "15"
    },
    {
      "children": [
        "40",
        "41",
        "42"
      ],
      "husb": "8",
      "id": "7",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "16"
    },
    {
      "children": [
        "43",
        "44"
      ],
      "husb": "9",
      "id": "8",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "17"
    },
    {
      "husb": "13",
      "id": "9",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "18"
    },
    {
      "children": [
        "45",
        "46"
      ],
      "husb": "10",
      "id": "10",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "19"
    },
    {
      "husb": "10",
      "id": "11",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "20"
    },
    {
      "children": [
        "62",
        "63"
      ],
      "husb": "21",
      "id": "12",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "47"
    },
    {
      "children": [
        "64",
        "65",
        "66",
        "67"
      ],
      "husb": "22",
      "id": "13",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "49"
    },
    {
      "children": [
        "68"
      ],
      "husb": "23",
      "id": "14",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "50"
    },
    {
      "children": [
        "69",
        "70"
      ],
      "husb": "25",
      "id": "15",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "51"
    },
    {
      "children": [
        "71"
      ],
      "husb": "28",
      "id": "16",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "52"
    },
    {
      "children": [
        "72"
      ],
      "husb": "29",
      "id": "17",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "53"
    },
    {
      "children": [
        "73",
        "74"
      ],
      "husb": "30",
      "id": "18",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "54"
    },
    {
      "children": [
        "75",
        "76"
      ],
      "husb": "31",
      "id": "19",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "55"
    },
    {
      "children": [
        "77",
        "78",
        "79",
        "80"
      ],
      "husb": "33",
      "id": "20",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "56"
    },
    {
      "husb": "34",
      "id": "21",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "57"
    },
    {
      "husb": "35",
      "id": "22",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "58"
    },
    {
      "husb": "36",
      "id": "23",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "59"
    },
    {
      "children": [
        "81"
      ],
      "husb": "37",
      "id": "24",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "60"
    },
    {
      "children": [
        "82"
      ],
      "husb": "45",
      "id": "25",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "61"
    },
    {
      "children": [
        "58"
      ],
      "husb": "83",
      "id": "26",
      "marriage": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "wife": "84"
    }
  ],
  "indis": [
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "1"
      ],
      "firstName": "KH. FADHOLI ASMUNI\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "1",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "1"
      ],
      "firstName": "Ny. Hj. Ukhrowiyah\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "2",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "2"
      ],
      "firstName": "1. Hasbullah Fadholi\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "3",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "3"
      ],
      "firstName": "2. Saifur Rijal\r\n\r\n\r\n",
      "id": "4",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "4"
      ],
      "firstName": "3. Siti Muti'ah Fadholi\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "5",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "5"
      ],
      "firstName": "4.Fatimatus Zahroh Fadholi\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "6",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "pekanbaru"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "6"
      ],
      "firstName": "4. Imam Asy'ari\r\n\r\n",
      "id": "7",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "pekanbaru"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "7"
      ],
      "firstName": "5. Subhan Efendi\r\n\r\n",
      "id": "8",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "sumenep"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "8"
      ],
      "firstName": "6. Ali Mas'udi\r\n\r\n",
      "id": "9",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "subang"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "1",
      "fams": [
        "10"
      ],
      "firstName": "7. Sumailah Fadholi\r\n\r\n",
      "id": "10",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "subang"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "2"
      ],
      "firstName": "1. Siti Suhaimi\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "11",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": 5,
          "month": 4,
          "year": 2022
        },
        "place": "karawang"
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "3"
      ],
      "firstName": "1. Husnul Hotimah\r\n\r\n\r\n",
      "id": "12",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "9"
      ],
      "firstName": "1. Ali Maksum",
      "id": "13",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "5"
      ],
      "firstName": "1. Sufyan\r\n\r\n\r\n\r\n\r\n\r\n",
      "id": "14",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "6"
      ],
      "firstName": "1. Nur Holifah\r\n\r\n",
      "id": "15",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "7"
      ],
      "firstName": "1. Musrifah\r\n\r\n",
      "id": "16",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "8"
      ],
      "firstName": "1. Ruqoyyah\r\n",
      "id": "17",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "9"
      ],
      "firstName": "2. Moslimah",
      "id": "18",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "10"
      ],
      "firstName": "1. K. Idris\r\n",
      "id": "19",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "11"
      ],
      "firstName": "2. Syafi'i",
      "id": "20",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "2",
      "fams": [
        "12"
      ],
      "firstName": "Rif'atus saadah\r\n\r\n",
      "id": "21",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "2",
      "fams": [
        "13"
      ],
      "firstName": "Fifin\r\n\r\n\r\n",
      "id": "22",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "2",
      "fams": [
        "14"
      ],
      "firstName": "Afifurrahman",
      "id": "23",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "2",
      "fams": [],
      "firstName": "Fida",
      "id": "24",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "3",
      "fams": [
        "15"
      ],
      "firstName": "Wimatus Sholihah\r\n",
      "id": "25",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "3",
      "fams": [],
      "firstName": "Chairil",
      "id": "26",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "3",
      "fams": [],
      "firstName": "Miftah",
      "id": "27",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "4",
      "fams": [
        "16"
      ],
      "firstName": "Yatul",
      "id": "28",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "4",
      "fams": [
        "17"
      ],
      "firstName": "Yatin (almh)",
      "id": "29",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "4",
      "fams": [
        "18"
      ],
      "firstName": "Zaitun\r\n",
      "id": "30",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "4",
      "fams": [
        "19"
      ],
      "firstName": "Anis\r\n",
      "id": "31",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "4",
      "fams": [],
      "firstName": "Farhan",
      "id": "32",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "5",
      "fams": [
        "20"
      ],
      "firstName": "Fahrur Rozi\r\n\r\n\r\n",
      "id": "33",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "5",
      "fams": [
        "21"
      ],
      "firstName": "Farid Mawardi",
      "id": "34",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "5",
      "fams": [
        "22"
      ],
      "firstName": "Fardanuddin Sufyan",
      "id": "35",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "5",
      "fams": [
        "23"
      ],
      "firstName": "Anna Fifit Rotin",
      "id": "36",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "6",
      "fams": [
        "24"
      ],
      "firstName": "Nia",
      "id": "37",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "6",
      "fams": [],
      "firstName": "ain",
      "id": "38",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "6",
      "fams": [],
      "firstName": "Fathi",
      "id": "39",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "7",
      "fams": [],
      "firstName": "Rizki",
      "id": "40",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "7",
      "fams": [],
      "firstName": "Rizal",
      "id": "41",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "7",
      "fams": [],
      "firstName": "Faqih",
      "id": "42",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "8",
      "fams": [],
      "firstName": "Zaim",
      "id": "43",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "8",
      "fams": [],
      "firstName": "Azam",
      "id": "44",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "10",
      "fams": [
        "25"
      ],
      "firstName": "Aini",
      "id": "45",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "10",
      "fams": [],
      "firstName": "Dyah",
      "id": "46",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "12"
      ],
      "firstName": "abdurrahman (cerai)\r\n",
      "id": "47",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [],
      "firstName": "Ainur Rofek",
      "id": "48",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "13"
      ],
      "firstName": "Suherman\r\n\r\n\r\n",
      "id": "49",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "14"
      ],
      "firstName": "fulanah",
      "id": "50",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "15"
      ],
      "firstName": "A. Fauzan\r\n",
      "id": "51",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "16"
      ],
      "firstName": "Nasihen",
      "id": "52",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "17"
      ],
      "firstName": "syafii",
      "id": "53",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "18"
      ],
      "firstName": "Khairuddin\r\n",
      "id": "54",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "19"
      ],
      "firstName": "hartono\r\n",
      "id": "55",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "20"
      ],
      "firstName": "Uswatun Hasanah\r\n\r\n\r\n",
      "id": "56",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "21"
      ],
      "firstName": "Chamidah",
      "id": "57",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "26",
      "fams": [
        "22"
      ],
      "firstName": "Nur Romlah",
      "id": "58",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "23"
      ],
      "firstName": "Shafwan",
      "id": "59",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "24"
      ],
      "firstName": "Iqbal",
      "id": "60",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "25"
      ],
      "firstName": "Ahis",
      "id": "61",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "12",
      "fams": [],
      "firstName": "Fatihul Haq",
      "id": "62",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "12",
      "fams": [],
      "firstName": "Nada",
      "id": "63",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "13",
      "fams": [],
      "firstName": "Izza",
      "id": "64",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "13",
      "fams": [],
      "firstName": "Najwa",
      "id": "65",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "13",
      "fams": [],
      "firstName": "Azhar",
      "id": "66",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "13",
      "fams": [],
      "firstName": "Faris",
      "id": "67",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "14",
      "fams": [],
      "firstName": "Fulan 3",
      "id": "68",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "15",
      "fams": [],
      "firstName": "Nuro",
      "id": "69",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "15",
      "fams": [],
      "firstName": "Malika",
      "id": "70",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "16",
      "fams": [],
      "firstName": "Lia",
      "id": "71",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "17",
      "fams": [],
      "firstName": "Ilham",
      "id": "72",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "18",
      "fams": [],
      "firstName": "baroroh",
      "id": "73",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "18",
      "fams": [],
      "firstName": "adiba",
      "id": "74",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "19",
      "fams": [],
      "firstName": "alif",
      "id": "75",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "19",
      "fams": [],
      "firstName": "alya",
      "id": "76",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "20",
      "fams": [],
      "firstName": "Fahkim",
      "id": "77",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "20",
      "fams": [],
      "firstName": "Fahri",
      "id": "78",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "20",
      "fams": [],
      "firstName": "Fathir",
      "id": "79",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "20",
      "fams": [],
      "firstName": "Fawaid",
      "id": "80",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "24",
      "fams": [],
      "firstName": "jasmin",
      "id": "81",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "25",
      "fams": [],
      "firstName": "Fulanah 4",
      "id": "82",
      "lastName": "",
      "sex": "F"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "26"
      ],
      "firstName": "bapak romlah",
      "id": "83",
      "lastName": "",
      "sex": "M"
    },
    {
      "birth": {
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "death": {
        "confirmed": false,
        "date": {
          "day": null,
          "month": null,
          "year": null
        },
        "place": null
      },
      "famc": "",
      "fams": [
        "26"
      ],
      "firstName": "ibu romlah",
      "id": "84",
      "lastName": "",
      "sex": "M"
    }
  ]
}

const zoomed = (size, event) => {
  const parent = select('#svgContainer').node();

  const scale = event.transform.k;
  const offsetX = max([0, (parent.clientWidth - size[0] * scale) / 2]);
  const offsetY = max([0, (parent.clientHeight - size[1] * scale) / 2]);
  select('#chartSvg')
    .attr('width', size[0] * scale)
    .attr('height', size[1] * scale)
    .attr('transform', `translate(${offsetX}, ${offsetY})`);
  select('#chart').attr('transform', `scale(${scale})`);

  parent.scrollLeft = -event.transform.x;
  parent.scrollTop = -event.transform.y;
}

const scrolled = () => {
  const parent = select('#svgContainer').node();
  const x = parent.scrollLeft + parent.clientWidth / 2;
  const y = parent.scrollTop + parent.clientHeight / 2;
  const scale = zoomTransform(parent).k;
  select(parent).call(zoom().translateTo, x / scale, y / scale);
}

const getStrippedSvg = () => {
  const svg = document.getElementById('chartSvg')?.cloneNode(true);

  svg.removeAttribute('transform');
  const parent = select('#svgContainer').node();
  const scale = zoomTransform(parent).k;
  svg.setAttribute('width', String(Number(svg.getAttribute('width')) / scale));
  svg.setAttribute(
    'height',
    String(Number(svg.getAttribute('height')) / scale),
  );
  svg.querySelector('#chart')?.removeAttribute('transform');

  return svg;
}

const getSvgContents = () => {
  return new XMLSerializer().serializeToString(getStrippedSvg());
}

class ChartWrapper {
  zoom(factor) {
    const parent = select('#svgContainer');
    this.zoomBehavior?.scaleBy(parent, factor);
  }

  /**
   * Renders the chart or performs a transition animation to a new state.
   * If indiInfo is not given, it means that it is the initial render and no
   * animation is performed.
   */
  renderChart(
    props,
    // intl,
    args = {
      initialRender: false,
      resetPosition: false,
    },
  ) {
    // Wait for animation to finish if animation is in progress.
    if (!args.initialRender && this.animating) {
      this.rerenderRequired = true;
      this.rerenderProps = props;
      this.rerenderResetPosition = args.resetPosition;
      return;
    }

    // Freeze changing selection after initial rendering.
    // if (!args.initialRender && props.freezeAnimation) {
    //   return;
    // }

    if (args.initialRender) {
      (select('#chart').node()).innerHTML = '';
      this.chart = createChart({
        // json: props.data,
        json: data2,
        // chartType: getChartType(props.chartType),
        // renderer: getRendererType(props.chartType),
        chartType: KinshipChart,
        renderer: DetailedRenderer,
        svgSelector: '#chart',
        // indiCallback: (info) => props.onSelection(info),
        // colors: chartColors.get(props.colors),
        animate: true,
        updateSvgSize: false,
        // locale: intl.locale,
      });
    } else {
      this.chart?.setData(props.data);
    }
    // const chartInfo = this.chart?.render({
    //   startIndi: props.selection.id,
    //   baseGeneration: props.selection.generation,
    // });
    const chartInfo = this.chart?.render();
    const svg = select('#chartSvg');
    const parent = select('#svgContainer').node();

    const scale = zoomTransform(parent).k;
    const zoomOutFactor = min([
      1,
      scale,
      parent.clientWidth / chartInfo.size[0],
      parent.clientHeight / chartInfo.size[1],
    ]);
    const extent = [max([0.1, zoomOutFactor]), 2];

    this.zoomBehavior = zoom()
      .scaleExtent(extent)
      .translateExtent([[0, 0], chartInfo.size])
      .on('zoom', (event) => zoomed(chartInfo.size, event));
    select(parent).on('scroll', scrolled).call(this.zoomBehavior);

    const scrollTopTween = (scrollTop) => {
      return () => {
        const i = interpolateNumber(parent.scrollTop, scrollTop);
        return (t) => {
          parent.scrollTop = i(t);
        };
      };
    };
    const scrollLeftTween = (scrollLeft) => {
      return () => {
        const i = interpolateNumber(parent.scrollLeft, scrollLeft);
        return (t) => {
          parent.scrollLeft = i(t);
        };
      };
    };

    const dx = parent.clientWidth / 2 - chartInfo.origin[0] * scale;
    const dy = parent.clientHeight / 2 - chartInfo.origin[1] * scale;
    const offsetX = max([
      0,
      (parent.clientWidth - chartInfo.size[0] * scale) / 2,
    ]);
    const offsetY = max([
      0,
      (parent.clientHeight - chartInfo.size[1] * scale) / 2,
    ]);
    const svgTransition = svg.transition().delay(200).duration(500);
    const transition = args.initialRender ? svg : svgTransition;
    transition
      .attr('transform', `translate(${offsetX}, ${offsetY})`)
      .attr('width', chartInfo.size[0] * scale)
      .attr('height', chartInfo.size[1] * scale);
    if (args.resetPosition) {
      if (args.initialRender) {
        parent.scrollLeft = -dx;
        parent.scrollTop = -dy;
      } else {
        svgTransition
          .tween('scrollLeft', scrollLeftTween(-dx))
          .tween('scrollTop', scrollTopTween(-dy));
      }
    }

    // After the animation is finished, rerender the chart if required.
    this.animating = true;
    chartInfo.animationPromise.then(() => {
      this.animating = false;
      if (this.rerenderRequired) {
        this.rerenderRequired = false;
        // Use `this.rerenderProps` instead of the props in scope because
        // the props may have been updated in the meantime.
        this.renderChart(this.rerenderProps, {
          initialRender: false,
          resetPosition: !!this.rerenderResetPosition,
        });
      }
    });
  }
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Chart = (props) => {
  const chartWrapper = useRef(new ChartWrapper());
  const prevProps = usePrevious(props);
  // const intl = useIntl();

  useEffect(() => {
    chartWrapper.current.renderChart(props, {
      initialRender: true,
      resetPosition: true,
    });
  });

  // const onSelectionIndi = (info) => {
  //   console.log(info)
  // }
  // const onSelectionFam = (info) => {
  //   console.log(info)
  // }

  // useEffect(() => {
  //   createChart({
  //     json: data2,
  //     chartType: KinshipChart,
  //     renderer: DetailedRenderer,
  //     svgSelector: '#chart',
  //     indiCallback: onSelectionIndi,
  //     famCallback: onSelectionFam,
  //     // colors: chartColors.get(props.colors!),
  //     animate: true,
  //     updateSvgSize: false,
  //     // locale: intl.locale,
  //   }).render();
  // })

  return (
    <div id="svgContainer">
      <Media greaterThanOrEqual="large" className="zoom">
        <button
          className="zoom-in"
        // onClick={() => chartWrapper.current.zoom(ZOOM_FACTOR)}
        >
          +
        </button>
        <button
          className="zoom-out"
        // onClick={() => chartWrapper.current.zoom(1 / ZOOM_FACTOR)}
        >
          −
        </button>
      </Media>
      <svg id="chartSvg">
        <g id="chart" />
      </svg>
    </div>
  )
}

export default Chart