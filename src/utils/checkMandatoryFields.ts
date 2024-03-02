const mandatoryFields = [
  "Status",
  "Quantity",
  "Customer",
  "Cust No'",
  "Total Price",
  "Project Type",
  "Price Per Item",
  "Invoice Currency",
  "Item Price Currency",
];

export const checkMandatoryFields = (row: string[]) => {
  const validationErrors: string[] = [];

  mandatoryFields.forEach((field, index) => {
    if (
      typeof row[index] === "undefined" ||
      row[index] === null ||
      row[index].trim() === ""
    ) {
      validationErrors.push(`Missing ${field}`);
    }
  });
  return validationErrors;
};
