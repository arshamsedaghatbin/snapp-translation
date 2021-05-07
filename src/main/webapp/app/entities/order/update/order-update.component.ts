import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOrder, Order } from '../order.model';
import { OrderService } from '../service/order.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { ITranslationCompany } from 'app/entities/translation-company/translation-company.model';
import { TranslationCompanyService } from 'app/entities/translation-company/service/translation-company.service';
import { IDeliveryTimeSlot } from 'app/entities/delivery-time-slot/delivery-time-slot.model';
import { DeliveryTimeSlotService } from 'app/entities/delivery-time-slot/service/delivery-time-slot.service';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;

  deliveriesCollection: IDelivery[] = [];
  handOversCollection: IDelivery[] = [];
  translationCompaniesCollection: ITranslationCompany[] = [];
  deliveryTimeSlotsCollection: IDeliveryTimeSlot[] = [];

  editForm = this.fb.group({
    id: [],
    handOverType: [],
    deliveryType: [],
    delivery: [],
    handOver: [],
    translationCompany: [],
    deliveryTimeSlot: [],
  });

  constructor(
    protected orderService: OrderService,
    protected deliveryService: DeliveryService,
    protected translationCompanyService: TranslationCompanyService,
    protected deliveryTimeSlotService: DeliveryTimeSlotService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  trackDeliveryById(index: number, item: IDelivery): number {
    return item.id!;
  }

  trackTranslationCompanyById(index: number, item: ITranslationCompany): number {
    return item.id!;
  }

  trackDeliveryTimeSlotById(index: number, item: IDeliveryTimeSlot): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
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

  protected updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      handOverType: order.handOverType,
      deliveryType: order.deliveryType,
      delivery: order.delivery,
      handOver: order.handOver,
      translationCompany: order.translationCompany,
      deliveryTimeSlot: order.deliveryTimeSlot,
    });

    this.deliveriesCollection = this.deliveryService.addDeliveryToCollectionIfMissing(this.deliveriesCollection, order.delivery);
    this.handOversCollection = this.deliveryService.addDeliveryToCollectionIfMissing(this.handOversCollection, order.handOver);
    this.translationCompaniesCollection = this.translationCompanyService.addTranslationCompanyToCollectionIfMissing(
      this.translationCompaniesCollection,
      order.translationCompany
    );
    this.deliveryTimeSlotsCollection = this.deliveryTimeSlotService.addDeliveryTimeSlotToCollectionIfMissing(
      this.deliveryTimeSlotsCollection,
      order.deliveryTimeSlot
    );
  }

  protected loadRelationshipsOptions(): void {
    this.deliveryService
      .query({ filter: 'order-is-null' })
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing(deliveries, this.editForm.get('delivery')!.value)
        )
      )
      .subscribe((deliveries: IDelivery[]) => (this.deliveriesCollection = deliveries));

    this.deliveryService
      .query({ filter: 'order-is-null' })
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing(deliveries, this.editForm.get('handOver')!.value)
        )
      )
      .subscribe((deliveries: IDelivery[]) => (this.handOversCollection = deliveries));

    this.translationCompanyService
      .query({ filter: 'order-is-null' })
      .pipe(map((res: HttpResponse<ITranslationCompany[]>) => res.body ?? []))
      .pipe(
        map((translationCompanies: ITranslationCompany[]) =>
          this.translationCompanyService.addTranslationCompanyToCollectionIfMissing(
            translationCompanies,
            this.editForm.get('translationCompany')!.value
          )
        )
      )
      .subscribe((translationCompanies: ITranslationCompany[]) => (this.translationCompaniesCollection = translationCompanies));

    this.deliveryTimeSlotService
      .query({ filter: 'order-is-null' })
      .pipe(map((res: HttpResponse<IDeliveryTimeSlot[]>) => res.body ?? []))
      .pipe(
        map((deliveryTimeSlots: IDeliveryTimeSlot[]) =>
          this.deliveryTimeSlotService.addDeliveryTimeSlotToCollectionIfMissing(
            deliveryTimeSlots,
            this.editForm.get('deliveryTimeSlot')!.value
          )
        )
      )
      .subscribe((deliveryTimeSlots: IDeliveryTimeSlot[]) => (this.deliveryTimeSlotsCollection = deliveryTimeSlots));
  }

  protected createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id'])!.value,
      handOverType: this.editForm.get(['handOverType'])!.value,
      deliveryType: this.editForm.get(['deliveryType'])!.value,
      delivery: this.editForm.get(['delivery'])!.value,
      handOver: this.editForm.get(['handOver'])!.value,
      translationCompany: this.editForm.get(['translationCompany'])!.value,
      deliveryTimeSlot: this.editForm.get(['deliveryTimeSlot'])!.value,
    };
  }
}
