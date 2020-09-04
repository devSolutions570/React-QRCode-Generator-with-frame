import React from "react";
import csvjson from "csvjson";
import "./App.css";
import QrCodeGenerator from "./qrcode/QrCodeGenerator";

import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ReactExport from "react-data-export";
var _ = require("lodash");

function App() {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const baseData = {
    aboutUs: "sss",
    activated: true,
    agentType: "restaurant",
    assignTo: "Jenny Wang",
    botResponse: [
      "What would you like? Here is our e-menu. Please list the item number on the menu, the size of entree, quantity, and any special requirements for the order. For example, #2 one small size of fish and chip; #10 one small garden salad (no cheese); #12 one medium drink (diet coke).",
      "Thanks! Please review the order. If everything looks good, please confirm the order. ",
      "Thank you! We will let you know when the order is ready. Usually, it takes about 30 minutes to get an order ready.",
      "Sorry, we don't have delivery service now. Do you want to order to pickup?",
      "It is my pleasure to serve you!",
    ],
    businessAddress: "sss",
    businessName: "sss",
    clientID: "ZUnZRmjRgTaYm5or36ZAhhygkh03",
    contactPersonEmail: "sss@gmail.com",
    contactPersonName: "sss",
    createdDate: "09-02-2020 6:43 PM",
    detailLocation: "sss",
    detailServiceLocation: "sss",
    greetings: "sss",
    isCreated: true,
    issues: ["I want to place an order", "ss", "ssss"],
    knowledgeBase: [
      {
        followUp: "",
        isDefault: true,
        needResponse: true,
        option: "I want to place an order",
        rank: "1",
        response: "Ok. For Pickup or delivery?",
        responseType: "Multiple choices",
      },
      {
        followUp: "",
        followUpNo: "unagree",
        followUpYes: "agree",
        needResponse: true,
        option: "ss",
        rank: "2",
        response: "ssss",
        responseType: "Multiple choices",
      },
      {
        followUp: "",
        followUpNo: "no",
        followUpYes: "okay",
        needResponse: true,
        option: "ssss",
        rank: "3",
        response: "sssss",
        responseType: "Multiple choices",
      },
    ],
    lat: 35.301055908203125,
    location: "sss",
    long: -120.66622362474077,
    modelName: "Restaurant service AI",
    name: "sss",
    objectDescription: "sss",
    orderTypes: { delivery: false, dineIn: false, pickup: false },
    title: "sss",
    type: "Mobile",
    updatedDate: "09-03-2020 5:20 AM",
    website: "sss",
  };
  const [multiDataSet, setmultiDataSet] = React.useState([]);
  // const csvData = csvjson.toCSV(
  const csvData = [
    {
      aboutUs: "hh",
      activated: true,
      agentType: "feedback",
      assignTo: "Jenny Wang",
      botResponse: ["It is my pleasure to serve you!"],
      businessAddress: "hh",
      businessName: "hh",
      clientID: "ZUnZRmjRgTaYm5or36ZAhhygkh03",
      contactPersonEmail: "hh@gmail.com",
      contactPersonName: "hh",
      createdDate: "09-02-2020 7:43 AM",
      detailLocation: "hh",
      detailServiceLocation: "hh",
      greetings: "hh",
      isCreated: true,
      issues: ["hh", "hh", "hh"],
      knowledgeBase: [""],
      lat: 35.301055908203125,
      location: "hh",
      long: -120.66622362474077,
      modelName: "General customer service AI",
      name: "hh",
      objectDescription: "hh",
      qrImage:
        "https://firebasestorage.googleapis.com/v0/b/piecode-7292b.appspot.com/o/Machine%2F-MGE3EL6MCywmVUWlF6C%2F-MGE3EL6MCywmVUWlF6C.png?alt=media&token=86bf8816-8aaa-4a38-bb4e-ffa6f7c25d08",
      title: "hh",
      type: "Mobile",
      updatedDate: "09-02-2020 7:44 AM",
      website: "hh",
    },
  ];
  const inputRef = React.useRef(null);
  const simulateClick = (e) => {
    inputRef.current.link.click();
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    var wscols = [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }];
    var wsrows = [
      { hpt: 50 }, // row 1 sets to the height of 12 in points
      { hpx: 100 }, // row 2 sets to the height of 16 in pixels
    ];
    ws["!rows"] = wsrows; // ws - worksheet
    ws["!cols"] = wscols;
    ws["A1"].t = "s";
    ws["A1"].s = {
      fill: {
        patternType: "none", // none / solid
        fgColor: { rgb: "FF000000" },
        bgColor: { rgb: "FFFFFFFF" },
      },
      font: {
        name: "Times New Roman",
        size: 16,
        color: { rgb: "#FF000000" },
        bold: true,
        italic: false,
        underline: false,
      },
      border: {
        top: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
      },
    };
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  function keyParse(baseDataParam, mainKey) {
    let keyResults = [];

    if (_.isArray(baseDataParam[mainKey])) {
      let subKeys = _.keys(baseDataParam[mainKey]);
      let arrayKeyResults = [];
      subKeys.forEach((key, value) => {
        if (_.isObject(baseDataParam[mainKey][key])) {
          arrayKeyResults = _.concat(
            arrayKeyResults,
            keyParse(baseDataParam[mainKey], key)
          );
        } else {
          arrayKeyResults.push(key);
        }
      });
      arrayKeyResults.forEach((key, value) => {
        keyResults.push(mainKey + "/" + key);
      });
    } else if (_.isObject(baseDataParam[mainKey])) {
      let subKeys = _.keys(baseDataParam[mainKey]);

      subKeys.forEach((key, value) => {
        keyResults.push(mainKey + "/" + key);
      });
    } else {
      keyResults.push(mainKey);
    }
    return keyResults;
  }

  function makeKeyArrays() {
    let DataSet = [];
    let xlsxColumes = [];
    let xlsxInitData = [];
    let machineKeys = _.keys(baseData);
    let kenLen = 0;
    machineKeys.forEach((key) => {
      let keyResult = keyParse(baseData, key);
      kenLen += keyResult.length;
      keyResult.forEach((key, value) => {
        xlsxColumes.push({
          title: key,
          width: { wch: key.length + 2 },
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "dedede" } },
            border: {
              top: { style: "thin", color: { auto: 1 } },
              right: { style: "thin", color: { auto: 1 } },
              bottom: { style: "thin", color: { auto: 1 } },
              left: { style: "thin", color: { auto: 1 } },
            },
            alignment: {
              vertical: "center",
              horizontal: "center",
              wrapText: false,
            },
            locked: true,
          },
        });
      });
    });

    let testValues = _.flatMap(baseData, (nameObj) => {
      if (_.isArray(nameObj)) {
        return _.values(nameObj).map((value) => {
          if (_.isObject(value)) {
            return _.values(value);
          }
          return value;
        });
      } else if (_.isObject(nameObj)) {
        return _.values(nameObj);
      } else {
        return nameObj;
      }
    });
    let valueResuts = _.flatten(testValues);

    for (let i = 0; i < valueResuts.length; i++) {
      xlsxInitData.push({
        value: valueResuts[i],
      });
    }

    DataSet.push({ columns: xlsxColumes, data: [xlsxInitData] });
    setmultiDataSet(DataSet);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>result: </p>
        {/* <CSVLink
          ref={inputRef}
          data={csvData}
          filename={"my-file.csv"}
          className="btn btn-primary"
          target="_blank"
          style={{
            display: "none",
            border: "1px solid",
            color: "red",
            padding: "0px",
            font: "20px",
            outline: "inherit",
            zIndex: "inherit",
            boxShadow: "none",
          }}
        >
          Download me
        </CSVLink> */}
        {/* <button onClick={() => exportToCSV(csvData, "testExcel")}> */}
        {/* <button onClick={() => simulateClick()}> */}
        <button onClick={() => makeKeyArrays()}>xlsx download butoon</button>
        <ExcelFile element={<button>Download Data With Styles</button>}>
          <ExcelSheet dataSet={multiDataSet} name="Organization" />
        </ExcelFile>
      </header>
    </div>
  );
}

export default App;
