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
    if (typeof row[index] === "undefined" || row[index] === null) {
      validationErrors.push(`Missing ${field}`);
    }
  });

  return validationErrors;
};

export const validateInvoicesData = (invoicesData: string[][]) => {
  return invoicesData.map((row) => {
    const validationErrors = checkMandatoryFields(row);
    return {
      ...row,
      validationErrors,
    };
  });
};
