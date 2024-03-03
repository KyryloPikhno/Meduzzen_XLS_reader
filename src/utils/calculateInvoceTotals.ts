import { ICurrencyRate, IInvoiceObject } from "../inerfaces";

export const calculateInvoiceTotals = (
  invoicesData: IInvoiceObject[],
  currencyRates: ICurrencyRate,
) => {
  return invoicesData.map((invoice) => {
    const totalPrice = Number(invoice["Total Price"]);
    const invoiceCurrency = invoice["Invoice Currency"];
    const itemPriceCurrency = invoice["Item Price Currency"];

    let invoiceTotal = totalPrice;

    if (
      totalPrice &&
      invoiceCurrency &&
      itemPriceCurrency &&
      itemPriceCurrency.toUpperCase() !== invoiceCurrency.toUpperCase()
    ) {
      const conversionRateFrom = currencyRates[itemPriceCurrency.toUpperCase()];
      const conversionRateTo = currencyRates[invoiceCurrency.toUpperCase()];
      invoiceTotal = (totalPrice * conversionRateFrom) / conversionRateTo;
    }

    return {
      ...invoice,
      "Invoice Total": isNaN(invoiceTotal)
        ? null
        : `${Math.trunc(invoiceTotal * 100) / 100} ${invoiceCurrency ? invoiceCurrency.toUpperCase() : ""}`,
    };
  });
};
