import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInvoice, Invoice } from '../invoice.model';
import { InvoiceService } from '../service/invoice.service';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving = false;

  handOversCollection: IDelivery[] = [];
  deliveriesCollection: IDelivery[] = [];

  editForm = this.fb.group({
    id: [],
    customerPrice: [],
    totalPrice: [],
    taxPrice: [],
    invoiceStatus: [],
    handOver: [],
    delivery: [],
  });

  constructor(
    protected invoiceService: InvoiceService,
    protected deliveryService: DeliveryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.updateForm(invoice);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  trackDeliveryById(index: number, item: IDelivery): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>): void {
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

  protected updateForm(invoice: IInvoice): void {
    this.editForm.patchValue({
      id: invoice.id,
      customerPrice: invoice.customerPrice,
      totalPrice: invoice.totalPrice,
      taxPrice: invoice.taxPrice,
      invoiceStatus: invoice.invoiceStatus,
      handOver: invoice.handOver,
      delivery: invoice.delivery,
    });

    this.handOversCollection = this.deliveryService.addDeliveryToCollectionIfMissing(this.handOversCollection, invoice.handOver);
    this.deliveriesCollection = this.deliveryService.addDeliveryToCollectionIfMissing(this.deliveriesCollection, invoice.delivery);
  }

  protected loadRelationshipsOptions(): void {
    this.deliveryService
      .query({ filter: 'invoice-is-null' })
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing(deliveries, this.editForm.get('handOver')!.value)
        )
      )
      .subscribe((deliveries: IDelivery[]) => (this.handOversCollection = deliveries));

    this.deliveryService
      .query({ filter: 'invoice-is-null' })
      .pipe(map((res: HttpResponse<IDelivery[]>) => res.body ?? []))
      .pipe(
        map((deliveries: IDelivery[]) =>
          this.deliveryService.addDeliveryToCollectionIfMissing(deliveries, this.editForm.get('delivery')!.value)
        )
      )
      .subscribe((deliveries: IDelivery[]) => (this.deliveriesCollection = deliveries));
  }

  protected createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id'])!.value,
      customerPrice: this.editForm.get(['customerPrice'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      taxPrice: this.editForm.get(['taxPrice'])!.value,
      invoiceStatus: this.editForm.get(['invoiceStatus'])!.value,
      handOver: this.editForm.get(['handOver'])!.value,
      delivery: this.editForm.get(['delivery'])!.value,
    };
  }
}
