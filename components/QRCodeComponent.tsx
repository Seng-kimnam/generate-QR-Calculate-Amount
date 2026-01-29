"use client";
import { useQRCode } from "next-qrcode";
import { FC } from "react";

interface QRCodeProps {
  qrValue : string;
  width?: number;
}
const QRCodeComponent: FC<QRCodeProps> = ({ qrValue, width }) => {
  const { Image } = useQRCode();
  console.log("QR Value: ", qrValue);

  return (
    <Image
        text={qrValue}
      options={{
        type: "image/jpeg",
        quality: 1,
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: !!width ? width : 200,
        color: {
          dark: "#000",
          light: "#FFFFFF",
        },
      }}
    />
  );
};

export default QRCodeComponent;