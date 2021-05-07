jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { OrderService } from '../service/order.service';
import { IOrder, Order } from '../order.model';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';
import { ITranslationCompany } from 'app/entities/translation-company/translation-company.model';
import { TranslationCompanyService } from 'app/entities/translation-company/service/translation-company.service';
import { IDeliveryTimeSlot } from 'app/entities/delivery-time-slot/delivery-time-slot.model';
import { DeliveryTimeSlotService } from 'app/entities/delivery-time-slot/service/delivery-time-slot.service';

import { OrderUpdateComponent } from './order-update.component';

describe('Component Tests', () => {
  describe('Order Management Update Component', () => {
    let comp: OrderUpdateComponent;
    let fixture: ComponentFixture<OrderUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let orderService: OrderService;
    let deliveryService: DeliveryService;
    let translationCompanyService: TranslationCompanyService;
    let deliveryTimeSlotService: DeliveryTimeSlotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [OrderUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(OrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      orderService = TestBed.inject(OrderService);
      deliveryService = TestBed.inject(DeliveryService);
      translationCompanyService = TestBed.inject(TranslationCompanyService);
      deliveryTimeSlotService = TestBed.inject(DeliveryTimeSlotService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call delivery query and add missing value', () => {
        const order: IOrder = { id: 456 };
        const delivery: IDelivery = { id: 53650 };
        order.delivery = delivery;

        const deliveryCollection: IDelivery[] = [{ id: 79159 }];
        spyOn(deliveryService, 'query').and.returnValue(of(new HttpResponse({ body: deliveryCollection })));
        const expectedCollection: IDelivery[] = [delivery, ...deliveryCollection];
        spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ order });
        comp.ngOnInit();

        expect(deliveryService.query).toHaveBeenCalled();
        expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(deliveryCollection, delivery);
        expect(comp.deliveriesCollection).toEqual(expectedCollection);
      });

      it('Should call handOver query and add missing value', () => {
        const order: IOrder = { id: 456 };
        const handOver: IDelivery = { id: 62791 };
        order.handOver = handOver;

        const handOverCollection: IDelivery[] = [{ id: 38424 }];
        spyOn(deliveryService, 'query').and.returnValue(of(new HttpResponse({ body: handOverCollection })));
        const expectedCollection: IDelivery[] = [handOver, ...handOverCollection];
        spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ order });
        comp.ngOnInit();

        expect(deliveryService.query).toHaveBeenCalled();
        expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(handOverCollection, handOver);
        expect(comp.handOversCollection).toEqual(expectedCollection);
      });

      it('Should call translationCompany query and add missing value', () => {
        const order: IOrder = { id: 456 };
        const translationCompany: ITranslationCompany = { id: 59253 };
        order.translationCompany = translationCompany;

        const translationCompanyCollection: ITranslationCompany[] = [{ id: 1307 }];
        spyOn(translationCompanyService, 'query').and.returnValue(of(new HttpResponse({ body: translationCompanyCollection })));
        const expectedCollection: ITranslationCompany[] = [translationCompany, ...translationCompanyCollection];
        spyOn(translationCompanyService, 'addTranslationCompanyToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ order });
        comp.ngOnInit();

        expect(translationCompanyService.query).toHaveBeenCalled();
        expect(translationCompanyService.addTranslationCompanyToCollectionIfMissing).toHaveBeenCalledWith(
          translationCompanyCollection,
          translationCompany
        );
        expect(comp.translationCompaniesCollection).toEqual(expectedCollection);
      });

      it('Should call deliveryTimeSlot query and add missing value', () => {
        const order: IOrder = { id: 456 };
        const deliveryTimeSlot: IDeliveryTimeSlot = { id: 47436 };
        order.deliveryTimeSlot = deliveryTimeSlot;

        const deliveryTimeSlotCollection: IDeliveryTimeSlot[] = [{ id: 44456 }];
        spyOn(deliveryTimeSlotService, 'query').and.returnValue(of(new HttpResponse({ body: deliveryTimeSlotCollection })));
        const expectedCollection: IDeliveryTimeSlot[] = [deliveryTimeSlot, ...deliveryTimeSlotCollection];
        spyOn(deliveryTimeSlotService, 'addDeliveryTimeSlotToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ order });
        comp.ngOnInit();

        expect(deliveryTimeSlotService.query).toHaveBeenCalled();
        expect(deliveryTimeSlotService.addDeliveryTimeSlotToCollectionIfMissing).toHaveBeenCalledWith(
          deliveryTimeSlotCollection,
          deliveryTimeSlot
        );
        expect(comp.deliveryTimeSlotsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const order: IOrder = { id: 456 };
        const delivery: IDelivery = { id: 69519 };
        order.delivery = delivery;
        const handOver: IDelivery = { id: 48081 };
        order.handOver = handOver;
        const translationCompany: ITranslationCompany = { id: 1257 };
        order.translationCompany = translationCompany;
        const deliveryTimeSlot: IDeliveryTimeSlot = { id: 39666 };
        order.deliveryTimeSlot = deliveryTimeSlot;

        activatedRoute.data = of({ order });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(order));
        expect(comp.deliveriesCollection).toContain(delivery);
        expect(comp.handOversCollection).toContain(handOver);
        expect(comp.translationCompaniesCollection).toContain(translationCompany);
        expect(comp.deliveryTimeSlotsCollection).toContain(deliveryTimeSlot);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const order = { id: 123 };
        spyOn(orderService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ order });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: order }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(orderService.update).toHaveBeenCalledWith(order);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const order = new Order();
        spyOn(orderService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ order });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: order }));
        saveSubject.complete();

        // THEN
        expect(orderService.create).toHaveBeenCalledWith(order);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const order = { id: 123 };
        spyOn(orderService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ order });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(orderService.update).toHaveBeenCalledWith(order);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDeliveryById', () => {
        it('Should return tracked Delivery primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDeliveryById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTranslationCompanyById', () => {
        it('Should return tracked TranslationCompany primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTranslationCompanyById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackDeliveryTimeSlotById', () => {
        it('Should return tracked DeliveryTimeSlot primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDeliveryTimeSlotById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
