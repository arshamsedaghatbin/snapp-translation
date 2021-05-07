jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { InvoiceService } from '../service/invoice.service';
import { IInvoice, Invoice } from '../invoice.model';
import { IDelivery } from 'app/entities/delivery/delivery.model';
import { DeliveryService } from 'app/entities/delivery/service/delivery.service';

import { InvoiceUpdateComponent } from './invoice-update.component';

describe('Component Tests', () => {
  describe('Invoice Management Update Component', () => {
    let comp: InvoiceUpdateComponent;
    let fixture: ComponentFixture<InvoiceUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let invoiceService: InvoiceService;
    let deliveryService: DeliveryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [InvoiceUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(InvoiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoiceUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      invoiceService = TestBed.inject(InvoiceService);
      deliveryService = TestBed.inject(DeliveryService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call handOver query and add missing value', () => {
        const invoice: IInvoice = { id: 456 };
        const handOver: IDelivery = { id: 10451 };
        invoice.handOver = handOver;

        const handOverCollection: IDelivery[] = [{ id: 37566 }];
        spyOn(deliveryService, 'query').and.returnValue(of(new HttpResponse({ body: handOverCollection })));
        const expectedCollection: IDelivery[] = [handOver, ...handOverCollection];
        spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        expect(deliveryService.query).toHaveBeenCalled();
        expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(handOverCollection, handOver);
        expect(comp.handOversCollection).toEqual(expectedCollection);
      });

      it('Should call delivery query and add missing value', () => {
        const invoice: IInvoice = { id: 456 };
        const delivery: IDelivery = { id: 92618 };
        invoice.delivery = delivery;

        const deliveryCollection: IDelivery[] = [{ id: 27501 }];
        spyOn(deliveryService, 'query').and.returnValue(of(new HttpResponse({ body: deliveryCollection })));
        const expectedCollection: IDelivery[] = [delivery, ...deliveryCollection];
        spyOn(deliveryService, 'addDeliveryToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        expect(deliveryService.query).toHaveBeenCalled();
        expect(deliveryService.addDeliveryToCollectionIfMissing).toHaveBeenCalledWith(deliveryCollection, delivery);
        expect(comp.deliveriesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const invoice: IInvoice = { id: 456 };
        const handOver: IDelivery = { id: 45664 };
        invoice.handOver = handOver;
        const delivery: IDelivery = { id: 81334 };
        invoice.delivery = delivery;

        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(invoice));
        expect(comp.handOversCollection).toContain(handOver);
        expect(comp.deliveriesCollection).toContain(delivery);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const invoice = { id: 123 };
        spyOn(invoiceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: invoice }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(invoiceService.update).toHaveBeenCalledWith(invoice);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const invoice = new Invoice();
        spyOn(invoiceService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: invoice }));
        saveSubject.complete();

        // THEN
        expect(invoiceService.create).toHaveBeenCalledWith(invoice);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const invoice = { id: 123 };
        spyOn(invoiceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ invoice });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(invoiceService.update).toHaveBeenCalledWith(invoice);
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
    });
  });
});
