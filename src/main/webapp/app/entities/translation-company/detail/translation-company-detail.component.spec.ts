import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TranslationCompanyDetailComponent } from './translation-company-detail.component';

describe('Component Tests', () => {
  describe('TranslationCompany Management Detail Component', () => {
    let comp: TranslationCompanyDetailComponent;
    let fixture: ComponentFixture<TranslationCompanyDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TranslationCompanyDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ translationCompany: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TranslationCompanyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TranslationCompanyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load translationCompany on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.translationCompany).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
