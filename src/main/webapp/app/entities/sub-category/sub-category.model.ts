import { ICategory } from 'app/entities/category/category.model';
import { PricingStrategy } from 'app/entities/enumerations/pricing-strategy.model';

export interface ISubCategory {
  id?: number;
  title?: string | null;
  pricing?: PricingStrategy | null;
  category?: ICategory | null;
}

export class SubCategory implements ISubCategory {
  constructor(
    public id?: number,
    public title?: string | null,
    public pricing?: PricingStrategy | null,
    public category?: ICategory | null
  ) {}
}

export function getSubCategoryIdentifier(subCategory: ISubCategory): number | undefined {
  return subCategory.id;
}
