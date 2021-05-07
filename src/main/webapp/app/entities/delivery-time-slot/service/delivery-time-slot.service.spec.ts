import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDeliveryTimeSlot, DeliveryTimeSlot } from '../delivery-time-slot.model';

import { DeliveryTimeSlotService } from './delivery-time-slot.service';

describe('Service Tests', () => {
  describe('DeliveryTimeSlot Service', () => {
    let service: DeliveryTimeSlotService;
    let httpMock: HttpTestingController;
    let elemDefault: IDeliveryTimeSlot;
    let expectedResult: IDeliveryTimeSlot | IDeliveryTimeSlot[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DeliveryTimeSlotService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        active: false,
        stratTime: 0,
        endTime: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DeliveryTimeSlot', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DeliveryTimeSlot()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DeliveryTimeSlot', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            active: true,
            stratTime: 1,
            endTime: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DeliveryTimeSlot', () => {
        const patchObject = Object.assign(
          {
            active: true,
            endTime: 1,
          },
          new DeliveryTimeSlot()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DeliveryTimeSlot', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            active: true,
            stratTime: 1,
            endTime: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DeliveryTimeSlot', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDeliveryTimeSlotToCollectionIfMissing', () => {
        it('should add a DeliveryTimeSlot to an empty array', () => {
          const deliveryTimeSlot: IDeliveryTimeSlot = { id: 123 };
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing([], deliveryTimeSlot);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(deliveryTimeSlot);
        });

        it('should not add a DeliveryTimeSlot to an array that contains it', () => {
          const deliveryTimeSlot: IDeliveryTimeSlot = { id: 123 };
          const deliveryTimeSlotCollection: IDeliveryTimeSlot[] = [
            {
              ...deliveryTimeSlot,
            },
            { id: 456 },
          ];
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing(deliveryTimeSlotCollection, deliveryTimeSlot);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DeliveryTimeSlot to an array that doesn't contain it", () => {
          const deliveryTimeSlot: IDeliveryTimeSlot = { id: 123 };
          const deliveryTimeSlotCollection: IDeliveryTimeSlot[] = [{ id: 456 }];
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing(deliveryTimeSlotCollection, deliveryTimeSlot);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(deliveryTimeSlot);
        });

        it('should add only unique DeliveryTimeSlot to an array', () => {
          const deliveryTimeSlotArray: IDeliveryTimeSlot[] = [{ id: 123 }, { id: 456 }, { id: 24214 }];
          const deliveryTimeSlotCollection: IDeliveryTimeSlot[] = [{ id: 123 }];
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing(deliveryTimeSlotCollection, ...deliveryTimeSlotArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const deliveryTimeSlot: IDeliveryTimeSlot = { id: 123 };
          const deliveryTimeSlot2: IDeliveryTimeSlot = { id: 456 };
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing([], deliveryTimeSlot, deliveryTimeSlot2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(deliveryTimeSlot);
          expect(expectedResult).toContain(deliveryTimeSlot2);
        });

        it('should accept null and undefined values', () => {
          const deliveryTimeSlot: IDeliveryTimeSlot = { id: 123 };
          expectedResult = service.addDeliveryTimeSlotToCollectionIfMissing([], null, deliveryTimeSlot, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(deliveryTimeSlot);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
