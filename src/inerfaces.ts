export interface ICurrencyRate {
  [key: string]: number;
}

export interface IInvoiceObject {
  [key: string]: string;
}

export interface IInvoice {
  [key: string]: string | number | string[];
}
