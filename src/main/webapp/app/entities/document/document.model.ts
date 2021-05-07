import { ICategory } from 'app/entities/category/category.model';
import { IOrder } from 'app/entities/order/order.model';
import { IInvoice } from 'app/entities/invoice/invoice.model';

export interface IDocument {
  id?: number;
  fileContentType?: string | null;
  file?: string | null;
  price?: number | null;
  categories?: ICategory[] | null;
  order?: IOrder | null;
  invoice?: IInvoice | null;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public fileContentType?: string | null,
    public file?: string | null,
    public price?: number | null,
    public categories?: ICategory[] | null,
    public order?: IOrder | null,
    public invoice?: IInvoice | null
  ) {}
}

export function getDocumentIdentifier(document: IDocument): number | undefined {
  return document.id;
}
