import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISubCategory, SubCategory } from '../sub-category.model';
import { SubCategoryService } from '../service/sub-category.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';

@Component({
  selector: 'jhi-sub-category-update',
  templateUrl: './sub-category-update.component.html',
})
export class SubCategoryUpdateComponent implements OnInit {
  isSaving = false;

  categoriesSharedCollection: ICategory[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    pricing: [],
    category: [],
  });

  constructor(
    protected subCategoryService: SubCategoryService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCategory }) => {
      this.updateForm(subCategory);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subCategory = this.createFromForm();
    if (subCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.subCategoryService.update(subCategory));
    } else {
      this.subscribeToSaveResponse(this.subCategoryService.create(subCategory));
    }
  }

  trackCategoryById(index: number, item: ICategory): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(subCategory: ISubCategory): void {
    this.editForm.patchValue({
      id: subCategory.id,
      title: subCategory.title,
      pricing: subCategory.pricing,
      category: subCategory.category,
    });

    this.categoriesSharedCollection = this.categoryService.addCategoryToCollectionIfMissing(
      this.categoriesSharedCollection,
      subCategory.category
    );
  }

  protected loadRelationshipsOptions(): void {
    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<ICategory[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategory[]) =>
          this.categoryService.addCategoryToCollectionIfMissing(categories, this.editForm.get('category')!.value)
        )
      )
      .subscribe((categories: ICategory[]) => (this.categoriesSharedCollection = categories));
  }

  protected createFromForm(): ISubCategory {
    return {
      ...new SubCategory(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      pricing: this.editForm.get(['pricing'])!.value,
      category: this.editForm.get(['category'])!.value,
    };
  }
}
