import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITranslationCompany, TranslationCompany } from '../translation-company.model';
import { TranslationCompanyService } from '../service/translation-company.service';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';

@Component({
  selector: 'jhi-translation-company-update',
  templateUrl: './translation-company-update.component.html',
})
export class TranslationCompanyUpdateComponent implements OnInit {
  isSaving = false;

  locationsCollection: ILocation[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    phoneNumber: [],
    secondPhoneNumber: [],
    location: [],
  });

  constructor(
    protected translationCompanyService: TranslationCompanyService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ translationCompany }) => {
      this.updateForm(translationCompany);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const translationCompany = this.createFromForm();
    if (translationCompany.id !== undefined) {
      this.subscribeToSaveResponse(this.translationCompanyService.update(translationCompany));
    } else {
      this.subscribeToSaveResponse(this.translationCompanyService.create(translationCompany));
    }
  }

  trackLocationById(index: number, item: ILocation): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITranslationCompany>>): void {
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

  protected updateForm(translationCompany: ITranslationCompany): void {
    this.editForm.patchValue({
      id: translationCompany.id,
      name: translationCompany.name,
      phoneNumber: translationCompany.phoneNumber,
      secondPhoneNumber: translationCompany.secondPhoneNumber,
      location: translationCompany.location,
    });

    this.locationsCollection = this.locationService.addLocationToCollectionIfMissing(this.locationsCollection, translationCompany.location);
  }

  protected loadRelationshipsOptions(): void {
    this.locationService
      .query({ filter: 'translationcompany-is-null' })
      .pipe(map((res: HttpResponse<ILocation[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocation[]) =>
          this.locationService.addLocationToCollectionIfMissing(locations, this.editForm.get('location')!.value)
        )
      )
      .subscribe((locations: ILocation[]) => (this.locationsCollection = locations));
  }

  protected createFromForm(): ITranslationCompany {
    return {
      ...new TranslationCompany(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      secondPhoneNumber: this.editForm.get(['secondPhoneNumber'])!.value,
      location: this.editForm.get(['location'])!.value,
    };
  }
}
