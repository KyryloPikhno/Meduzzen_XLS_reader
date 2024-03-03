import { findInvoicingMonthFromFile } from "../utils/findInvoicingMonthFromFile";
import { calculateInvoiceTotals } from "../utils/calculateInvoceTotals";
import { filterInvoicesData } from "../utils/filterInvoicesData";
import { findCurrencyRates } from "../utils/findCurrencyRates";
import { NextFunction, Request, Response } from "express";
import * as XLSX from "xlsx";

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

    const invoicesData = filterInvoicesData(rows);
    const InvoicingMonth = findInvoicingMonthFromFile(rows);
    const currencyRates = findCurrencyRates(rows);
    const invoicesDataWithInvoiceTotals = calculateInvoiceTotals(
      invoicesData,
      currencyRates,
    );
    // const invoicesDataWithValidation =
    //   validateInvoicesData(invoicesDataObjects);

    res.json({
      length: invoicesDataWithInvoiceTotals.length,
      InvoicingMonth,
      currencyRates,
      invoicesData: invoicesDataWithInvoiceTotals,
    });
  } catch (e) {
    next(e);
  }
};
