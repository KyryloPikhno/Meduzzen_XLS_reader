import { findInvoicingMonthFromFile } from "../utils/findInvoicingMonthFromFile";
import { calculateInvoiceTotals } from "../utils/calculateInvoceTotals";
import { validateInvoicesData } from "../utils/validateInvoicesData";
import { filterInvoicesData } from "../utils/filterInvoicesData";
import { findCurrencyRates } from "../utils/findCurrencyRates";
import { NextFunction, Request, Response } from "express";
import * as XLSX from "xlsx";

export const uploadFileController = {
  post: (req: Request, res: Response, next: NextFunction) => {
    try {
      const workbook = XLSX.read(req.file!.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: string[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const invoicesData = filterInvoicesData(rows);
      const invoicingMonth = findInvoicingMonthFromFile(
        rows,
        (req.query.invoicingMonth as string) ?? null,
      );
      const currencyRates = findCurrencyRates(rows);
      const invoicesDataWithInvoiceTotals = calculateInvoiceTotals(
        invoicesData,
        currencyRates,
      );
      const invoicesDataWithValidation = validateInvoicesData(
        invoicesDataWithInvoiceTotals,
        currencyRates,
        req.file!.originalname,
      );

      res.json({
        InvoicingMonth: invoicingMonth,
        currencyRates,
        invoicesData: invoicesDataWithValidation,
      });
    } catch (e) {
      next(e);
    }
  },
};
