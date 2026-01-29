"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

type QRGeneratorProps = {
  qrValue: string;
  handleCopyToClipboard: () => void;
};
const QRGenerator = ({ qrValue, handleCopyToClipboard }: QRGeneratorProps) => {
  return (
    <>
      {/* QR Code Section */}
      <Card className="p-4 sm:p-8 shadow-2xl border-2 border-accent/20 flex flex-col items-center justify-center">
        <div className="bg-white p-3 h-40 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-8 border-2 border-accent/10">
          <QRCodeCanvas
            value={qrValue}
            // size={140}
            level="H"
            // includeMargin={true}
            fgColor="#1a1a1a"
            bgColor="#ffffff"
            className="sm:w-64 sm:h-64 w-48 h-48"
          />
        </div>

        <div className="w-full bg-linear-to-r from-accent/10 to-primary/10 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 border border-accent/20">
          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-2">
            Current Value
          </p>
          <p className="text-center text-2xl sm:text-3xl font-bold text-accent wrap-break-words">
            {qrValue}
          </p>
        </div>

        <Button
          onClick={handleCopyToClipboard}
          className="w-full cursor-pointer h-10 sm:h-12 text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Copy className="w-4 sm:w-5 h-4 sm:h-5" />
          Copy Value
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4 sm:mt-6">
          QR code updates as you type. Scan with any phone camera!
        </p>
      </Card>
    </>
  );
};

export default QRGenerator;
