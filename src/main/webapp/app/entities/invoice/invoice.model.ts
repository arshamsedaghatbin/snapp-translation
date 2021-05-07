import { IDelivery } from 'app/entities/delivery/delivery.model';
import { IDocument } from 'app/entities/document/document.model';
import { InvoiceStatus } from 'app/entities/enumerations/invoice-status.model';

export interface IInvoice {
  id?: number;
  customerPrice?: number | null;
  totalPrice?: number | null;
  taxPrice?: number | null;
  invoiceStatus?: InvoiceStatus | null;
  handOver?: IDelivery | null;
  delivery?: IDelivery | null;
  documents?: IDocument[] | null;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public customerPrice?: number | null,
    public totalPrice?: number | null,
    public taxPrice?: number | null,
    public invoiceStatus?: InvoiceStatus | null,
    public handOver?: IDelivery | null,
    public delivery?: IDelivery | null,
    public documents?: IDocument[] | null
  ) {}
}

export function getInvoiceIdentifier(invoice: IInvoice): number | undefined {
  return invoice.id;
}
