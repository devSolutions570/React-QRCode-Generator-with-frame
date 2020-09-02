import { useState, useEffect } from "react";
import QrcodeDecoder from "qrcode-decoder";

export const useQrDecode = (data, options) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    if (data) {
      const qr = new QrcodeDecoder();

      qr.decodeFromImage(data, options).then((res) => {
        setText(res.data);
      });
    }
  }, [data, options]);

  return text;
};
