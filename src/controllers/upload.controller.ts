import { findInvoicingMonthFromFile } from "../utils/findInvoicingMonthFromFile";
import { calculateInvoiceTotals } from "../utils/calculateInvoceTotals";
import { validateInvoicesData } from "../utils/validateInvoicesData";
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
    const invoicingMonth = findInvoicingMonthFromFile(rows);
    const currencyRates = findCurrencyRates(rows);
    const invoicesDataWithInvoiceTotals = calculateInvoiceTotals(
      invoicesData,
      currencyRates,
    );
    const invoicesDataWithValidation = validateInvoicesData(
      invoicesDataWithInvoiceTotals,
      currencyRates,
      req.file.originalname,
    );

    res.json({
      length: invoicesDataWithValidation.length,
      InvoicingMonth: invoicingMonth,
      currencyRates,
      invoicesData: invoicesDataWithValidation,
    });
  } catch (e) {
    next(e);
  }
};
