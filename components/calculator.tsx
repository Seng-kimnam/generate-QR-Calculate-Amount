"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QRGenerator from "./qrgenerator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import BuildKHQR from "@/utils/BuildKHQRService";
import buildKHQR from "@/utils/BuildKHQRService";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [qrValue, setQrValue] = useState("0");

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setQrValue(num);
      setWaitingForNewValue(false);
    } else {
      const newDisplay = display === "0" ? num : display + num;
      setDisplay(newDisplay);
      setQrValue(newDisplay);
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      const newDisplay = display + ".";
      setDisplay(newDisplay);
      setQrValue(newDisplay);
      setWaitingForNewValue(false);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev: number, current: number, op: string) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = performCalculation(previousValue, currentValue, operation);
      const resultStr = String(result);
      setDisplay(resultStr);
      setQrValue(resultStr);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setQrValue("0");
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setQrValue(newDisplay);
    } else {
      setDisplay("0");
      setQrValue("0");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  const buildKHQRValue = buildKHQR(qrValue)
  return (  
    <div className="flex flex-col  items-center justify-center min-h-screen bg-linear-to-br from-background to-muted p-3 sm:p-4 gap-4 sm:gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-full  max-w-4xl">
        {/* Calculator Section */}
        <Card className="p-4 sm:p-8 shadow-2xl border-2 border-primary/20">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-primary">
            Calculator
          </h1>

          {/* Display */}
          <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-xl p-3 sm:p-6 mb-4 sm:mb-8 border border-primary/20">
            <div className="text-right text-3xl sm:text-5xl font-bold text-primary wrap-break-words">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-6">
            {buttons.map((row, rowIdx) => (
              <div key={rowIdx} className="contents">
                {row.map((btn) => {
                  const isOperator = ["+", "-", "×", "÷", "="].includes(btn);
                  const isEquals = btn === "=";

                  return (
                    <Button
                      key={btn}
                      onClick={() => {
                        if (isEquals) {
                          handleEquals();
                        } else if (isOperator) {
                          handleOperation(btn);
                        } else if (btn === ".") {
                          handleDecimal();
                        } else {
                          handleNumberClick(btn);
                        }
                      }}
                      className={`h-12 sm:h-16 text-sm sm:text-xl font-semibold transition-all ${
                        isOperator
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                          : "bg-muted hover:bg-muted/80 text-foreground border border-primary/10"
                      }`}
                    >
                      {btn}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button
              onClick={handleBackspace}
              className="h-10 sm:h-12 text-sm cursor-pointer border-2 sm:text-base bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              ← Back
            </Button>
            <Button
              onClick={handleClear}
              className="h-10 text-white sm:h-12 cursor-pointer text-sm sm:text-base bg-destructive hover:bg-destructive/90 font-semibold"
            >
              Clear
            </Button>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button
                // onClick={handleClear}
                className="h-10 text-white w-full cursor-pointer sm:h-12 text-sm sm:text-base bg-green-600 hover:bg-green-700 font-semibold"
              >
                Generate QR
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {/* <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-accent"> */}
                  QR Code
                  {/* </h3> */}
                </DialogTitle>
                <DialogDescription>
                  <QRGenerator
                    qrValue={buildKHQRValue}
                    handleCopyToClipboard={handleCopyToClipboard}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Card>

        {/* QR Code Section */}
      </div>
    </div>
  );
}
