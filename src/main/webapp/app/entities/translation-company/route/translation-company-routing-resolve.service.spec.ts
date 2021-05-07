jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITranslationCompany, TranslationCompany } from '../translation-company.model';
import { TranslationCompanyService } from '../service/translation-company.service';

import { TranslationCompanyRoutingResolveService } from './translation-company-routing-resolve.service';

describe('Service Tests', () => {
  describe('TranslationCompany routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TranslationCompanyRoutingResolveService;
    let service: TranslationCompanyService;
    let resultTranslationCompany: ITranslationCompany | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TranslationCompanyRoutingResolveService);
      service = TestBed.inject(TranslationCompanyService);
      resultTranslationCompany = undefined;
    });

    describe('resolve', () => {
      it('should return ITranslationCompany returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTranslationCompany = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTranslationCompany).toEqual({ id: 123 });
      });

      it('should return new ITranslationCompany if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTranslationCompany = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTranslationCompany).toEqual(new TranslationCompany());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTranslationCompany = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTranslationCompany).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
