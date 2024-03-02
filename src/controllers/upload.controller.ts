import { NextFunction, Request, Response } from "express";
import * as XLSX from "xlsx";
import moment from "moment";
import { checkMandatoryFields } from "../utils/checkMandatoryFields";

enum REQUIRED_COLUMN {
  INVOICE = "Invoice #",
  STATUS = "Status",
}

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let InvoicingMonth = "";

    rows.forEach((row) => {
      row.forEach((cell) => {
        const dateMoment = moment(cell, "MMM YYYY", true);
        if (dateMoment.isValid()) InvoicingMonth = dateMoment.format("YYYY-MM");
      });
    });

    let headerRowIndex = -1;

    rows.forEach((row, index) => {
      if (
        row.includes(REQUIRED_COLUMN.INVOICE) ||
        row.includes(REQUIRED_COLUMN.STATUS)
      )
        headerRowIndex = index;
    });

    const headers = rows[headerRowIndex] as string[];

    const statusColumnIndex = headers.indexOf(REQUIRED_COLUMN.STATUS);
    const invoiceColumnIndex = headers.indexOf(REQUIRED_COLUMN.INVOICE);

    const invoicesData = rows.slice(headerRowIndex + 1).filter((row) => {
      return (
        row[statusColumnIndex] === "Ready" ||
        typeof row[invoiceColumnIndex] === "string"
      );
    });

    const invoicesDataWithValidation = invoicesData.map((row) => {
      const validationErrors = checkMandatoryFields(row);
      return {
        ...row,
        validationErrors,
      };
    });

    res.json({
      InvoicingMonth,
      invoicesData: invoicesDataWithValidation,
    });
  } catch (e) {
    next(e);
  }
};
