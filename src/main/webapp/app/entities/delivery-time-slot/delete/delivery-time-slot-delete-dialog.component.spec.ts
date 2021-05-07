jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeliveryTimeSlotService } from '../service/delivery-time-slot.service';

import { DeliveryTimeSlotDeleteDialogComponent } from './delivery-time-slot-delete-dialog.component';

describe('Component Tests', () => {
  describe('DeliveryTimeSlot Management Delete Component', () => {
    let comp: DeliveryTimeSlotDeleteDialogComponent;
    let fixture: ComponentFixture<DeliveryTimeSlotDeleteDialogComponent>;
    let service: DeliveryTimeSlotService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DeliveryTimeSlotDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(DeliveryTimeSlotDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliveryTimeSlotDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DeliveryTimeSlotService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
