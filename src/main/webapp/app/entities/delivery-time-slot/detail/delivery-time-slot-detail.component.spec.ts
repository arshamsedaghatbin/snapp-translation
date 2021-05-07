import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeliveryTimeSlotDetailComponent } from './delivery-time-slot-detail.component';

describe('Component Tests', () => {
  describe('DeliveryTimeSlot Management Detail Component', () => {
    let comp: DeliveryTimeSlotDetailComponent;
    let fixture: ComponentFixture<DeliveryTimeSlotDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryTimeSlotDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ deliveryTimeSlot: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DeliveryTimeSlotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliveryTimeSlotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliveryTimeSlot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliveryTimeSlot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
