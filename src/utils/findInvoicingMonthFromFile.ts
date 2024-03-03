import moment from "moment";

export const findInvoicingMonthFromFile = (rows: string[][]) => {
  let invoicingMonth = "";

  rows.some((row) =>
    row.some((cell) => {
      const dateMoment = moment(cell, "MMM YYYY", true);
      if (dateMoment.isValid()) invoicingMonth = dateMoment.format("YYYY-MM");

      return false;
    }),
  );

  return invoicingMonth;
};
