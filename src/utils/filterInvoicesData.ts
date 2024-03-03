import { IInvoiceObject } from "../inerfaces";
import { REQUIRED_COLUMN } from "../enums";

export const filterInvoicesData = (rows: string[][]) => {
  const headerRowIndex = rows.findIndex(
    (row) =>
      row.includes(REQUIRED_COLUMN.INVOICE) &&
      row.includes(REQUIRED_COLUMN.STATUS),
  );

  if (headerRowIndex === -1) return [];

  const headers = rows[headerRowIndex] as string[];
  const statusColumnIndex = headers.indexOf(REQUIRED_COLUMN.STATUS);
  const invoiceColumnIndex = headers.indexOf(REQUIRED_COLUMN.INVOICE);

  const invoicesData = rows
    .slice(headerRowIndex + 1)
    .filter(
      (row) =>
        row[statusColumnIndex] === "Ready" ||
        typeof row[invoiceColumnIndex] === "string",
    );

  const invoicesDataObjects = invoicesData.map((row) => {
    return row.reduce((invoiceObject, cell, index) => {
      invoiceObject[headers[index]] = cell;
      return invoiceObject;
    }, {} as IInvoiceObject);
  });

  return invoicesDataObjects;
};
