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
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const invoicingMonth = req.body.invoicingMonth;
    const currencyRates: Record<string, number> = {};

    const invoicesData = data
      .filter((row: any) => row.Status === "ready" || row["Invoice #"])
      .map((row: any) => {
        const validationErrors: string[] = [];

        return { ...row, validationErrors };
      });

    res.json({
      InvoicingMonth: invoicingMonth,
      currencyRates,
      invoicesData,
    });
  } catch (e) {
    next(e);
  }
};
