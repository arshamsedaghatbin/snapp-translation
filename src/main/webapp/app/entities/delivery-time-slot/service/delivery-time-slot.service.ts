import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeliveryTimeSlot, getDeliveryTimeSlotIdentifier } from '../delivery-time-slot.model';

export type EntityResponseType = HttpResponse<IDeliveryTimeSlot>;
export type EntityArrayResponseType = HttpResponse<IDeliveryTimeSlot[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryTimeSlotService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-time-slots');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(deliveryTimeSlot: IDeliveryTimeSlot): Observable<EntityResponseType> {
    return this.http.post<IDeliveryTimeSlot>(this.resourceUrl, deliveryTimeSlot, { observe: 'response' });
  }

  update(deliveryTimeSlot: IDeliveryTimeSlot): Observable<EntityResponseType> {
    return this.http.put<IDeliveryTimeSlot>(
      `${this.resourceUrl}/${getDeliveryTimeSlotIdentifier(deliveryTimeSlot) as number}`,
      deliveryTimeSlot,
      { observe: 'response' }
    );
  }

  partialUpdate(deliveryTimeSlot: IDeliveryTimeSlot): Observable<EntityResponseType> {
    return this.http.patch<IDeliveryTimeSlot>(
      `${this.resourceUrl}/${getDeliveryTimeSlotIdentifier(deliveryTimeSlot) as number}`,
      deliveryTimeSlot,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeliveryTimeSlot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliveryTimeSlot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDeliveryTimeSlotToCollectionIfMissing(
    deliveryTimeSlotCollection: IDeliveryTimeSlot[],
    ...deliveryTimeSlotsToCheck: (IDeliveryTimeSlot | null | undefined)[]
  ): IDeliveryTimeSlot[] {
    const deliveryTimeSlots: IDeliveryTimeSlot[] = deliveryTimeSlotsToCheck.filter(isPresent);
    if (deliveryTimeSlots.length > 0) {
      const deliveryTimeSlotCollectionIdentifiers = deliveryTimeSlotCollection.map(
        deliveryTimeSlotItem => getDeliveryTimeSlotIdentifier(deliveryTimeSlotItem)!
      );
      const deliveryTimeSlotsToAdd = deliveryTimeSlots.filter(deliveryTimeSlotItem => {
        const deliveryTimeSlotIdentifier = getDeliveryTimeSlotIdentifier(deliveryTimeSlotItem);
        if (deliveryTimeSlotIdentifier == null || deliveryTimeSlotCollectionIdentifiers.includes(deliveryTimeSlotIdentifier)) {
          return false;
        }
        deliveryTimeSlotCollectionIdentifiers.push(deliveryTimeSlotIdentifier);
        return true;
      });
      return [...deliveryTimeSlotsToAdd, ...deliveryTimeSlotCollection];
    }
    return deliveryTimeSlotCollection;
  }
}
