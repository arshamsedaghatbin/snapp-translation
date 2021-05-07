jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TranslationCompanyService } from '../service/translation-company.service';
import { ITranslationCompany, TranslationCompany } from '../translation-company.model';
import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';

import { TranslationCompanyUpdateComponent } from './translation-company-update.component';

describe('Component Tests', () => {
  describe('TranslationCompany Management Update Component', () => {
    let comp: TranslationCompanyUpdateComponent;
    let fixture: ComponentFixture<TranslationCompanyUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let translationCompanyService: TranslationCompanyService;
    let locationService: LocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TranslationCompanyUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TranslationCompanyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TranslationCompanyUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      translationCompanyService = TestBed.inject(TranslationCompanyService);
      locationService = TestBed.inject(LocationService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call location query and add missing value', () => {
        const translationCompany: ITranslationCompany = { id: 456 };
        const location: ILocation = { id: 96203 };
        translationCompany.location = location;

        const locationCollection: ILocation[] = [{ id: 3491 }];
        spyOn(locationService, 'query').and.returnValue(of(new HttpResponse({ body: locationCollection })));
        const expectedCollection: ILocation[] = [location, ...locationCollection];
        spyOn(locationService, 'addLocationToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ translationCompany });
        comp.ngOnInit();

        expect(locationService.query).toHaveBeenCalled();
        expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(locationCollection, location);
        expect(comp.locationsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const translationCompany: ITranslationCompany = { id: 456 };
        const location: ILocation = { id: 44189 };
        translationCompany.location = location;

        activatedRoute.data = of({ translationCompany });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(translationCompany));
        expect(comp.locationsCollection).toContain(location);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const translationCompany = { id: 123 };
        spyOn(translationCompanyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ translationCompany });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: translationCompany }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(translationCompanyService.update).toHaveBeenCalledWith(translationCompany);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const translationCompany = new TranslationCompany();
        spyOn(translationCompanyService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ translationCompany });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: translationCompany }));
        saveSubject.complete();

        // THEN
        expect(translationCompanyService.create).toHaveBeenCalledWith(translationCompany);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const translationCompany = { id: 123 };
        spyOn(translationCompanyService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ translationCompany });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(translationCompanyService.update).toHaveBeenCalledWith(translationCompany);
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
