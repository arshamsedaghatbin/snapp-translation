import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryTimeSlot } from '../delivery-time-slot.model';

@Component({
  selector: 'jhi-delivery-time-slot-detail',
  templateUrl: './delivery-time-slot-detail.component.html',
})
export class DeliveryTimeSlotDetailComponent implements OnInit {
  deliveryTimeSlot: IDeliveryTimeSlot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTimeSlot }) => {
      this.deliveryTimeSlot = deliveryTimeSlot;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
