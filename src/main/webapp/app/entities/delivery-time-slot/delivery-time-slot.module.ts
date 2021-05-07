import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DeliveryTimeSlotComponent } from './list/delivery-time-slot.component';
import { DeliveryTimeSlotDetailComponent } from './detail/delivery-time-slot-detail.component';
import { DeliveryTimeSlotUpdateComponent } from './update/delivery-time-slot-update.component';
import { DeliveryTimeSlotDeleteDialogComponent } from './delete/delivery-time-slot-delete-dialog.component';
import { DeliveryTimeSlotRoutingModule } from './route/delivery-time-slot-routing.module';

@NgModule({
  imports: [SharedModule, DeliveryTimeSlotRoutingModule],
  declarations: [
    DeliveryTimeSlotComponent,
    DeliveryTimeSlotDetailComponent,
    DeliveryTimeSlotUpdateComponent,
    DeliveryTimeSlotDeleteDialogComponent,
  ],
  entryComponents: [DeliveryTimeSlotDeleteDialogComponent],
})
export class DeliveryTimeSlotModule {}
