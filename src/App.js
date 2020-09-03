import React from "react";
import csvjson from "csvjson";
import "./App.css";
import QrCodeGenerator from "./qrcode/QrCodeGenerator";

import { CSVLink } from "react-csv";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ReactExport from "react-data-export";

function App() {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const multiDataSet = [
    {
      columns: [
        { title: "Headings", width: { wpx: 80 } }, //pixels width
        { title: "Text Style", width: { wch: 40 } }, //char width
        { title: "Colors", width: { wpx: 90 } },
      ],
      data: [
        [
          { value: "H1", style: { font: { sz: "24", bold: true } } },
          { value: "Bold", style: { font: { bold: true } } },
          {
            value: "Red",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
            },
          },
        ],
        [
          { value: "H2", style: { font: { sz: "18", bold: true } } },
          { value: "underline", style: { font: { underline: true } } },
          {
            value: "Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
            },
          },
        ],
        [
          { value: "H3", style: { font: { sz: "14", bold: true } } },
          { value: "italic", style: { font: { italic: true } } },
          {
            value: "Green",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
            },
          },
        ],
        [
          { value: "H4", style: { font: { sz: "12", bold: true } } },
          { value: "strike", style: { font: { strike: true } } },
          {
            value: "Orange",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
            },
          },
        ],
        [
          { value: "H5", style: { font: { sz: "10.5", bold: true } } },
          { value: "outline", style: { font: { outline: true } } },
          {
            value: "Yellow",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
            },
          },
        ],
        [
          { value: "H6", style: { font: { sz: "7.5", bold: true } } },
          { value: "shadow", style: { font: { shadow: true } } },
          {
            value: "Light Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
            },
          },
        ],
      ],
    },
  ];
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
      image: [
        "https://firebasestorage.googleapis.com/v0/b/piecod…=media&token=6c14d9c3-caaf-4e3a-bad2-1bd69440127c",
      ],
      isCreated: true,
      issues: [("hh", "hh", "hh")],
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
        <button onClick={() => exportToCSV(csvData, "testExcel")}>
          {/* <button onClick={() => simulateClick()}> */}
          xlsx download butoon
        </button>
        <ExcelFile element={<button>Download Data With Styles</button>}>
          <ExcelSheet dataSet={multiDataSet} name="Organization" />
        </ExcelFile>
      </header>
    </div>
  );
}

export default App;
