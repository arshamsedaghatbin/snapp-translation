import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeliveryTimeSlotComponent } from '../list/delivery-time-slot.component';
import { DeliveryTimeSlotDetailComponent } from '../detail/delivery-time-slot-detail.component';
import { DeliveryTimeSlotUpdateComponent } from '../update/delivery-time-slot-update.component';
import { DeliveryTimeSlotRoutingResolveService } from './delivery-time-slot-routing-resolve.service';

const deliveryTimeSlotRoute: Routes = [
  {
    path: '',
    component: DeliveryTimeSlotComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryTimeSlotDetailComponent,
    resolve: {
      deliveryTimeSlot: DeliveryTimeSlotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryTimeSlotUpdateComponent,
    resolve: {
      deliveryTimeSlot: DeliveryTimeSlotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryTimeSlotUpdateComponent,
    resolve: {
      deliveryTimeSlot: DeliveryTimeSlotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryTimeSlotRoute)],
  exports: [RouterModule],
})
export class DeliveryTimeSlotRoutingModule {}
