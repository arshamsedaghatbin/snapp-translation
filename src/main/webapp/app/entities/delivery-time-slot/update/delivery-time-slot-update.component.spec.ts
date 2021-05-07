jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DeliveryTimeSlotService } from '../service/delivery-time-slot.service';
import { IDeliveryTimeSlot, DeliveryTimeSlot } from '../delivery-time-slot.model';

import { DeliveryTimeSlotUpdateComponent } from './delivery-time-slot-update.component';

describe('Component Tests', () => {
  describe('DeliveryTimeSlot Management Update Component', () => {
    let comp: DeliveryTimeSlotUpdateComponent;
    let fixture: ComponentFixture<DeliveryTimeSlotUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let deliveryTimeSlotService: DeliveryTimeSlotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DeliveryTimeSlotUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DeliveryTimeSlotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeliveryTimeSlotUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      deliveryTimeSlotService = TestBed.inject(DeliveryTimeSlotService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const deliveryTimeSlot: IDeliveryTimeSlot = { id: 456 };

        activatedRoute.data = of({ deliveryTimeSlot });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(deliveryTimeSlot));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const deliveryTimeSlot = { id: 123 };
        spyOn(deliveryTimeSlotService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ deliveryTimeSlot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: deliveryTimeSlot }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(deliveryTimeSlotService.update).toHaveBeenCalledWith(deliveryTimeSlot);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const deliveryTimeSlot = new DeliveryTimeSlot();
        spyOn(deliveryTimeSlotService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ deliveryTimeSlot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: deliveryTimeSlot }));
        saveSubject.complete();

        // THEN
        expect(deliveryTimeSlotService.create).toHaveBeenCalledWith(deliveryTimeSlot);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const deliveryTimeSlot = { id: 123 };
        spyOn(deliveryTimeSlotService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ deliveryTimeSlot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(deliveryTimeSlotService.update).toHaveBeenCalledWith(deliveryTimeSlot);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
