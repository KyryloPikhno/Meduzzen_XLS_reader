import { ICurrencyRate, IInvoice } from "../inerfaces";

const mandatoryFields = [
  "Customer",
  "Cust No'",
  "Project Type",
  "Quantity",
  "Price Per Item",
  "Item Price Currency",
  "Total Price",
  "Invoice Currency",
  "Status",
];

export const validateInvoicesData = (
  invoicesData: IInvoice[],
  currencyRates: ICurrencyRate,
  fileName: string,
) => {
  return invoicesData.map((invoice) => ({
    ...invoice,
    validationErrors: mandatoryFields.reduce(
      (errors: string[], field: string) => {
        if (!invoice.hasOwnProperty(field)) {
          errors.push(`Missing '${field.toLowerCase()}' field.`);
        }

        if (field === "Invoice Currency") {
          const currency = (invoice[field] as string) ?? "";
          if (currency === "") {
            errors.push(
              "Missing 'Invoice Currency' field. Unable to calculate Invoice Total without currency information.",
            );
          } else if (!currencyRates[currency]) {
            errors.push(
              `The rate for '${currency}' is not specified in the ${fileName} file. Unable to calculate 'Invoice Total'.`,
            );
          }
        }

        return errors;
      },
      [],
    ),
  }));
};
