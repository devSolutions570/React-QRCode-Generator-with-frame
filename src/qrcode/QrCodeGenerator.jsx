import React, { useState, useEffect } from "react";
import QrcodeDecoder from "qrcode-decoder";
import mergeImages from "merge-images";
import QrCode from "qrcode";
import { QRCode } from "react-qrcode";

const QrCodeGenerator = (params) => {
  const { originQRImage, originQRFrameImage, margin } = params;

  const [mergedImage, setMergedImage] = useState(null);
  const [originQrValue, setOriginQrValue] = useState("");

  useEffect(() => {
    async function decodeImage() {
      const qr = new QrcodeDecoder();
      const result = await qr.decodeFromImage(originQRImage);
      setOriginQrValue(result.data);
      return;
    }

    decodeImage();
    if (originQrValue !== "") {
      const canvas = document.createElement("canvas");
      QrCode.toDataURL(
        canvas,
        originQrValue,
        {
          width: 950,
          height: 950,
          color: {
            dark: "#1696c5",
            light: "#F4F4F4",
          },
          backgroundColor: "#1696c5",
          margin: margin,
        },
        (err, url) => {
          if (err) return null;
          if (url) {
            mergeImages([
              {
                src: originQRFrameImage,
                x: 0,
                y: 0,
              },
              {
                src: url,
                x: 425,
                y: 425,
              },
            ]).then((base64) => {
              setMergedImage(base64);
            });
          }
        }
      );
    }
  }, [margin, originQRFrameImage, originQRImage, originQrValue]);

  return (
    <div>
      <img src={mergedImage} alt="logo" style={{ width: "200px" }} />
      {/* <QRCode value={originQrValue} /> */}
    </div>
  );
};

export default QrCodeGenerator;
