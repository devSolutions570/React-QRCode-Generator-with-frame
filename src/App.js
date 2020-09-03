import React from "react";
import csvjson from "csvjson";
import "./App.css";
import QrCodeGenerator from "./qrcode/QrCodeGenerator";

import { CSVLink } from "react-csv";

function App() {
  const csvData = csvjson.toCSV(
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
    {
      headers: "key",
    }
  );

  const inputRef = React.useRef(null);
  const simulateClick = (e) => {
    inputRef.current.link.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>result: </p>
        <CSVLink
          ref={inputRef}
          data={csvData}
          filename={"my-file.csv"}
          className="btn btn-primary"
          target="_blank"
          style={{ display: "none" }}
        >
          Download me
        </CSVLink>
        <button onClick={simulateClick}>ref butoon</button>
      </header>
    </div>
  );
}

export default App;
