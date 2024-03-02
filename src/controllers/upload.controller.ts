import express, { NextFunction, Request, Response } from "express";
import * as XLSX from "xlsx";

interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
  body: { invoicingMonth: string };
}

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const workbook = XLSX.readFile(req.file.path);
    console.log(workbook);

    res.json({
      InvoicingMonth: "invoicingMonth",
      // currencyRates,
      // invoicesData,
    });
  } catch (e) {
    next(e);
  }
};
