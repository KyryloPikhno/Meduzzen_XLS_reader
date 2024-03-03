import moment from "moment";

const YYYY_MM = "YYYY-MM";
const MMM_YYYY = "MMM YYYY";

export const findInvoicingMonthFromFile = (
  rows: string[][],
  invoicingMonthFromParams: string | null,
) => {
  let invoicingMonthFromFile = invoicingMonthFromParams
    ? moment(invoicingMonthFromParams)
    : moment();

  rows.some((row) =>
    row.some((cell) => {
      const dateMoment = moment(cell, MMM_YYYY, true);
      if (dateMoment.isValid()) invoicingMonthFromFile = dateMoment;

      return false;
    }),
  );

  return invoicingMonthFromFile.format(YYYY_MM);
};
