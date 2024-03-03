import { IInvoice } from "../inerfaces";

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

export const validateInvoicesData = (invoicesData: IInvoice[]) => {
  return invoicesData.map((invoice) => ({
    ...invoice,
    validationErrors: mandatoryFields.reduce(
      (errors: string[], field: string) => {
        if (!invoice.hasOwnProperty(field)) {
          errors.push(`Missing ${field}`);
        }
        return errors;
      },
      [],
    ),
  }));
};
