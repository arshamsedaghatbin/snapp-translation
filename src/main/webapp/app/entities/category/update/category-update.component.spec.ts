jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CategoryService } from '../service/category.service';
import { ICategory, Category } from '../category.model';
import { IDocument } from 'app/entities/document/document.model';
import { DocumentService } from 'app/entities/document/service/document.service';

import { CategoryUpdateComponent } from './category-update.component';

describe('Component Tests', () => {
  describe('Category Management Update Component', () => {
    let comp: CategoryUpdateComponent;
    let fixture: ComponentFixture<CategoryUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let categoryService: CategoryService;
    let documentService: DocumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoryUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      categoryService = TestBed.inject(CategoryService);
      documentService = TestBed.inject(DocumentService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Document query and add missing value', () => {
        const category: ICategory = { id: 456 };
        const document: IDocument = { id: 42195 };
        category.document = document;

        const documentCollection: IDocument[] = [{ id: 69771 }];
        spyOn(documentService, 'query').and.returnValue(of(new HttpResponse({ body: documentCollection })));
        const additionalDocuments = [document];
        const expectedCollection: IDocument[] = [...additionalDocuments, ...documentCollection];
        spyOn(documentService, 'addDocumentToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ category });
        comp.ngOnInit();

        expect(documentService.query).toHaveBeenCalled();
        expect(documentService.addDocumentToCollectionIfMissing).toHaveBeenCalledWith(documentCollection, ...additionalDocuments);
        expect(comp.documentsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const category: ICategory = { id: 456 };
        const document: IDocument = { id: 82184 };
        category.document = document;

        activatedRoute.data = of({ category });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(category));
        expect(comp.documentsSharedCollection).toContain(document);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const category = { id: 123 };
        spyOn(categoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: category }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(categoryService.update).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const category = new Category();
        spyOn(categoryService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: category }));
        saveSubject.complete();

        // THEN
        expect(categoryService.create).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const category = { id: 123 };
        spyOn(categoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(categoryService.update).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDocumentById', () => {
        it('Should return tracked Document primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDocumentById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
