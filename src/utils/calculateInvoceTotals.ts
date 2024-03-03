import { ICurrencyRate, IInvoiceObject } from "../inerfaces";

export const calculateInvoiceTotals = (
  invoicesData: IInvoiceObject[],
  currencyRates: ICurrencyRate,
) => {
  return invoicesData.map((invoice) => {
    const totalPrice = invoice["Total Price"];
    const invoiceCurrency = "ILS";
    const itemPriceCurrency = invoice["Item Price Currency"];

    let invoiceTotal = totalPrice ? Number(totalPrice) : null;

    if (
      totalPrice &&
      invoiceCurrency &&
      itemPriceCurrency &&
      itemPriceCurrency.toUpperCase() !== invoiceCurrency.toUpperCase()
    ) {
      const conversionRateFrom = currencyRates[itemPriceCurrency.toUpperCase()];
      const conversionRateTo = currencyRates[invoiceCurrency.toUpperCase()];
      invoiceTotal =
        (Number(totalPrice) * conversionRateFrom) / conversionRateTo;
    }

    return {
      ...invoice,
      "Invoice Total": invoiceTotal,
    };
  });
};
