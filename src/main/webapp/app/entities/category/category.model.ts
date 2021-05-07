import { ISubCategory } from 'app/entities/sub-category/sub-category.model';
import { IDocument } from 'app/entities/document/document.model';
import { CategoryType } from 'app/entities/enumerations/category-type.model';

export interface ICategory {
  id?: number;
  documentCategory?: CategoryType | null;
  subCategories?: ISubCategory[] | null;
  document?: IDocument | null;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public documentCategory?: CategoryType | null,
    public subCategories?: ISubCategory[] | null,
    public document?: IDocument | null
  ) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
