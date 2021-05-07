jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DeliveryService } from '../service/delivery.service';
import { IDelivery, Delivery } from '../delivery.model';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';

import { DeliveryUpdateComponent } from './delivery-update.component';

describe('Component Tests', () => {
  describe('Delivery Management Update Component', () => {
    let comp: DeliveryUpdateComponent;
    let fixture: ComponentFixture<DeliveryUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let deliveryService: DeliveryService;
    let locationService: LocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DeliveryUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DeliveryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeliveryUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      deliveryService = TestBed.inject(DeliveryService);
      locationService = TestBed.inject(LocationService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call origin query and add missing value', () => {
        const delivery: IDelivery = { id: 456 };
        const origin: ILocation = { id: 68807 };
        delivery.origin = origin;

        const originCollection: ILocation[] = [{ id: 91503 }];
        spyOn(locationService, 'query').and.returnValue(of(new HttpResponse({ body: originCollection })));
        const expectedCollection: ILocation[] = [origin, ...originCollection];
        spyOn(locationService, 'addLocationToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        expect(locationService.query).toHaveBeenCalled();
        expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(originCollection, origin);
        expect(comp.originsCollection).toEqual(expectedCollection);
      });

      it('Should call destination query and add missing value', () => {
        const delivery: IDelivery = { id: 456 };
        const destination: ILocation = { id: 81057 };
        delivery.destination = destination;

        const destinationCollection: ILocation[] = [{ id: 5100 }];
        spyOn(locationService, 'query').and.returnValue(of(new HttpResponse({ body: destinationCollection })));
        const expectedCollection: ILocation[] = [destination, ...destinationCollection];
        spyOn(locationService, 'addLocationToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        expect(locationService.query).toHaveBeenCalled();
        expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(destinationCollection, destination);
        expect(comp.destinationsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const delivery: IDelivery = { id: 456 };
        const origin: ILocation = { id: 84213 };
        delivery.origin = origin;
        const destination: ILocation = { id: 94322 };
        delivery.destination = destination;

        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(delivery));
        expect(comp.originsCollection).toContain(origin);
        expect(comp.destinationsCollection).toContain(destination);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const delivery = { id: 123 };
        spyOn(deliveryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: delivery }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(deliveryService.update).toHaveBeenCalledWith(delivery);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const delivery = new Delivery();
        spyOn(deliveryService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: delivery }));
        saveSubject.complete();

        // THEN
        expect(deliveryService.create).toHaveBeenCalledWith(delivery);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const delivery = { id: 123 };
        spyOn(deliveryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ delivery });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(deliveryService.update).toHaveBeenCalledWith(delivery);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackLocationById', () => {
        it('Should return tracked Location primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLocationById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
