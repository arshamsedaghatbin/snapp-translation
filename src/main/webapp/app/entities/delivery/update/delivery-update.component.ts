import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDelivery, Delivery } from '../delivery.model';
import { DeliveryService } from '../service/delivery.service';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';

@Component({
  selector: 'jhi-delivery-update',
  templateUrl: './delivery-update.component.html',
})
export class DeliveryUpdateComponent implements OnInit {
  isSaving = false;

  originsCollection: ILocation[] = [];
  destinationsCollection: ILocation[] = [];

  editForm = this.fb.group({
    id: [],
    price: [],
    origin: [],
    destination: [],
  });

  constructor(
    protected deliveryService: DeliveryService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ delivery }) => {
      this.updateForm(delivery);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const delivery = this.createFromForm();
    if (delivery.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryService.update(delivery));
    } else {
      this.subscribeToSaveResponse(this.deliveryService.create(delivery));
    }
  }

  trackLocationById(index: number, item: ILocation): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDelivery>>): void {
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

  protected updateForm(delivery: IDelivery): void {
    this.editForm.patchValue({
      id: delivery.id,
      price: delivery.price,
      origin: delivery.origin,
      destination: delivery.destination,
    });

    this.originsCollection = this.locationService.addLocationToCollectionIfMissing(this.originsCollection, delivery.origin);
    this.destinationsCollection = this.locationService.addLocationToCollectionIfMissing(this.destinationsCollection, delivery.destination);
  }

  protected loadRelationshipsOptions(): void {
    this.locationService
      .query({ filter: 'delivery-is-null' })
      .pipe(map((res: HttpResponse<ILocation[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocation[]) =>
          this.locationService.addLocationToCollectionIfMissing(locations, this.editForm.get('origin')!.value)
        )
      )
      .subscribe((locations: ILocation[]) => (this.originsCollection = locations));

    this.locationService
      .query({ filter: 'delivery-is-null' })
      .pipe(map((res: HttpResponse<ILocation[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocation[]) =>
          this.locationService.addLocationToCollectionIfMissing(locations, this.editForm.get('destination')!.value)
        )
      )
      .subscribe((locations: ILocation[]) => (this.destinationsCollection = locations));
  }

  protected createFromForm(): IDelivery {
    return {
      ...new Delivery(),
      id: this.editForm.get(['id'])!.value,
      price: this.editForm.get(['price'])!.value,
      origin: this.editForm.get(['origin'])!.value,
      destination: this.editForm.get(['destination'])!.value,
    };
  }
}
