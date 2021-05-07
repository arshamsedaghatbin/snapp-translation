import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITranslationCompany, TranslationCompany } from '../translation-company.model';
import { TranslationCompanyService } from '../service/translation-company.service';

@Injectable({ providedIn: 'root' })
export class TranslationCompanyRoutingResolveService implements Resolve<ITranslationCompany> {
  constructor(protected service: TranslationCompanyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITranslationCompany> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((translationCompany: HttpResponse<TranslationCompany>) => {
          if (translationCompany.body) {
            return of(translationCompany.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TranslationCompany());
  }
}
