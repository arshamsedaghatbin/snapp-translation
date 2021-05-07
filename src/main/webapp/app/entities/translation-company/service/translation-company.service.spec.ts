import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITranslationCompany, TranslationCompany } from '../translation-company.model';

import { TranslationCompanyService } from './translation-company.service';

describe('Service Tests', () => {
  describe('TranslationCompany Service', () => {
    let service: TranslationCompanyService;
    let httpMock: HttpTestingController;
    let elemDefault: ITranslationCompany;
    let expectedResult: ITranslationCompany | ITranslationCompany[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TranslationCompanyService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        phoneNumber: 'AAAAAAA',
        secondPhoneNumber: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TranslationCompany', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TranslationCompany()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TranslationCompany', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            secondPhoneNumber: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TranslationCompany', () => {
        const patchObject = Object.assign(
          {
            phoneNumber: 'BBBBBB',
            secondPhoneNumber: 'BBBBBB',
          },
          new TranslationCompany()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TranslationCompany', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            secondPhoneNumber: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TranslationCompany', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTranslationCompanyToCollectionIfMissing', () => {
        it('should add a TranslationCompany to an empty array', () => {
          const translationCompany: ITranslationCompany = { id: 123 };
          expectedResult = service.addTranslationCompanyToCollectionIfMissing([], translationCompany);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(translationCompany);
        });

        it('should not add a TranslationCompany to an array that contains it', () => {
          const translationCompany: ITranslationCompany = { id: 123 };
          const translationCompanyCollection: ITranslationCompany[] = [
            {
              ...translationCompany,
            },
            { id: 456 },
          ];
          expectedResult = service.addTranslationCompanyToCollectionIfMissing(translationCompanyCollection, translationCompany);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TranslationCompany to an array that doesn't contain it", () => {
          const translationCompany: ITranslationCompany = { id: 123 };
          const translationCompanyCollection: ITranslationCompany[] = [{ id: 456 }];
          expectedResult = service.addTranslationCompanyToCollectionIfMissing(translationCompanyCollection, translationCompany);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(translationCompany);
        });

        it('should add only unique TranslationCompany to an array', () => {
          const translationCompanyArray: ITranslationCompany[] = [{ id: 123 }, { id: 456 }, { id: 66597 }];
          const translationCompanyCollection: ITranslationCompany[] = [{ id: 123 }];
          expectedResult = service.addTranslationCompanyToCollectionIfMissing(translationCompanyCollection, ...translationCompanyArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const translationCompany: ITranslationCompany = { id: 123 };
          const translationCompany2: ITranslationCompany = { id: 456 };
          expectedResult = service.addTranslationCompanyToCollectionIfMissing([], translationCompany, translationCompany2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(translationCompany);
          expect(expectedResult).toContain(translationCompany2);
        });

        it('should accept null and undefined values', () => {
          const translationCompany: ITranslationCompany = { id: 123 };
          expectedResult = service.addTranslationCompanyToCollectionIfMissing([], null, translationCompany, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(translationCompany);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
