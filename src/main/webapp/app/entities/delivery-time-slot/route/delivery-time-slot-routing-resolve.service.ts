import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeliveryTimeSlot, DeliveryTimeSlot } from '../delivery-time-slot.model';
import { DeliveryTimeSlotService } from '../service/delivery-time-slot.service';

@Injectable({ providedIn: 'root' })
export class DeliveryTimeSlotRoutingResolveService implements Resolve<IDeliveryTimeSlot> {
  constructor(protected service: DeliveryTimeSlotService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryTimeSlot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deliveryTimeSlot: HttpResponse<DeliveryTimeSlot>) => {
          if (deliveryTimeSlot.body) {
            return of(deliveryTimeSlot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DeliveryTimeSlot());
  }
}
