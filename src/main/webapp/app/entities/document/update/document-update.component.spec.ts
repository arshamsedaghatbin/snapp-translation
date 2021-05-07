jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DocumentService } from '../service/document.service';
import { IDocument, Document } from '../document.model';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { IInvoice } from 'app/entities/invoice/invoice.model';
import { InvoiceService } from 'app/entities/invoice/service/invoice.service';

import { DocumentUpdateComponent } from './document-update.component';

describe('Component Tests', () => {
  describe('Document Management Update Component', () => {
    let comp: DocumentUpdateComponent;
    let fixture: ComponentFixture<DocumentUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let documentService: DocumentService;
    let orderService: OrderService;
    let invoiceService: InvoiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DocumentUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DocumentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      documentService = TestBed.inject(DocumentService);
      orderService = TestBed.inject(OrderService);
      invoiceService = TestBed.inject(InvoiceService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Order query and add missing value', () => {
        const document: IDocument = { id: 456 };
        const order: IOrder = { id: 74141 };
        document.order = order;

        const orderCollection: IOrder[] = [{ id: 74309 }];
        spyOn(orderService, 'query').and.returnValue(of(new HttpResponse({ body: orderCollection })));
        const additionalOrders = [order];
        const expectedCollection: IOrder[] = [...additionalOrders, ...orderCollection];
        spyOn(orderService, 'addOrderToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ document });
        comp.ngOnInit();

        expect(orderService.query).toHaveBeenCalled();
        expect(orderService.addOrderToCollectionIfMissing).toHaveBeenCalledWith(orderCollection, ...additionalOrders);
        expect(comp.ordersSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Invoice query and add missing value', () => {
        const document: IDocument = { id: 456 };
        const invoice: IInvoice = { id: 38331 };
        document.invoice = invoice;

        const invoiceCollection: IInvoice[] = [{ id: 6307 }];
        spyOn(invoiceService, 'query').and.returnValue(of(new HttpResponse({ body: invoiceCollection })));
        const additionalInvoices = [invoice];
        const expectedCollection: IInvoice[] = [...additionalInvoices, ...invoiceCollection];
        spyOn(invoiceService, 'addInvoiceToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ document });
        comp.ngOnInit();

        expect(invoiceService.query).toHaveBeenCalled();
        expect(invoiceService.addInvoiceToCollectionIfMissing).toHaveBeenCalledWith(invoiceCollection, ...additionalInvoices);
        expect(comp.invoicesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const document: IDocument = { id: 456 };
        const order: IOrder = { id: 90598 };
        document.order = order;
        const invoice: IInvoice = { id: 29319 };
        document.invoice = invoice;

        activatedRoute.data = of({ document });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(document));
        expect(comp.ordersSharedCollection).toContain(order);
        expect(comp.invoicesSharedCollection).toContain(invoice);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const document = { id: 123 };
        spyOn(documentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ document });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: document }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(documentService.update).toHaveBeenCalledWith(document);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const document = new Document();
        spyOn(documentService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ document });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: document }));
        saveSubject.complete();

        // THEN
        expect(documentService.create).toHaveBeenCalledWith(document);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const document = { id: 123 };
        spyOn(documentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ document });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(documentService.update).toHaveBeenCalledWith(document);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackOrderById', () => {
        it('Should return tracked Order primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackOrderById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackInvoiceById', () => {
        it('Should return tracked Invoice primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackInvoiceById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
