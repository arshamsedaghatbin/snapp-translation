import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDeliveryTimeSlot, DeliveryTimeSlot } from '../delivery-time-slot.model';
import { DeliveryTimeSlotService } from '../service/delivery-time-slot.service';

@Component({
  selector: 'jhi-delivery-time-slot-update',
  templateUrl: './delivery-time-slot-update.component.html',
})
export class DeliveryTimeSlotUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    active: [],
    stratTime: [],
    endTime: [],
  });

  constructor(
    protected deliveryTimeSlotService: DeliveryTimeSlotService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTimeSlot }) => {
      this.updateForm(deliveryTimeSlot);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryTimeSlot = this.createFromForm();
    if (deliveryTimeSlot.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryTimeSlotService.update(deliveryTimeSlot));
    } else {
      this.subscribeToSaveResponse(this.deliveryTimeSlotService.create(deliveryTimeSlot));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryTimeSlot>>): void {
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

  protected updateForm(deliveryTimeSlot: IDeliveryTimeSlot): void {
    this.editForm.patchValue({
      id: deliveryTimeSlot.id,
      active: deliveryTimeSlot.active,
      stratTime: deliveryTimeSlot.stratTime,
      endTime: deliveryTimeSlot.endTime,
    });
  }

  protected createFromForm(): IDeliveryTimeSlot {
    return {
      ...new DeliveryTimeSlot(),
      id: this.editForm.get(['id'])!.value,
      active: this.editForm.get(['active'])!.value,
      stratTime: this.editForm.get(['stratTime'])!.value,
      endTime: this.editForm.get(['endTime'])!.value,
    };
  }
}
