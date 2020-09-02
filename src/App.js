import React from "react";
import "./App.css";
import QrCodeGenerator from "./qrcode/QrCodeGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>My QR CODE</p>
        <QrCodeGenerator
          originQRImage="qr_test.jpg"
          originQRFrameImage="qr_frame1.png"
          margin={1}
        />
      </header>
    </div>
  );
}

export default App;
