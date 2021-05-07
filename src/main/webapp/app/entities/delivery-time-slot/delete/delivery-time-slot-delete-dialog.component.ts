import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryTimeSlot } from '../delivery-time-slot.model';
import { DeliveryTimeSlotService } from '../service/delivery-time-slot.service';

@Component({
  templateUrl: './delivery-time-slot-delete-dialog.component.html',
})
export class DeliveryTimeSlotDeleteDialogComponent {
  deliveryTimeSlot?: IDeliveryTimeSlot;

  constructor(protected deliveryTimeSlotService: DeliveryTimeSlotService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryTimeSlotService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
