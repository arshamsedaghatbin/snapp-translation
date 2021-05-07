import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITranslationCompany, getTranslationCompanyIdentifier } from '../translation-company.model';

export type EntityResponseType = HttpResponse<ITranslationCompany>;
export type EntityArrayResponseType = HttpResponse<ITranslationCompany[]>;

@Injectable({ providedIn: 'root' })
export class TranslationCompanyService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/translation-companies');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(translationCompany: ITranslationCompany): Observable<EntityResponseType> {
    return this.http.post<ITranslationCompany>(this.resourceUrl, translationCompany, { observe: 'response' });
  }

  update(translationCompany: ITranslationCompany): Observable<EntityResponseType> {
    return this.http.put<ITranslationCompany>(
      `${this.resourceUrl}/${getTranslationCompanyIdentifier(translationCompany) as number}`,
      translationCompany,
      { observe: 'response' }
    );
  }

  partialUpdate(translationCompany: ITranslationCompany): Observable<EntityResponseType> {
    return this.http.patch<ITranslationCompany>(
      `${this.resourceUrl}/${getTranslationCompanyIdentifier(translationCompany) as number}`,
      translationCompany,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITranslationCompany>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITranslationCompany[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTranslationCompanyToCollectionIfMissing(
    translationCompanyCollection: ITranslationCompany[],
    ...translationCompaniesToCheck: (ITranslationCompany | null | undefined)[]
  ): ITranslationCompany[] {
    const translationCompanies: ITranslationCompany[] = translationCompaniesToCheck.filter(isPresent);
    if (translationCompanies.length > 0) {
      const translationCompanyCollectionIdentifiers = translationCompanyCollection.map(
        translationCompanyItem => getTranslationCompanyIdentifier(translationCompanyItem)!
      );
      const translationCompaniesToAdd = translationCompanies.filter(translationCompanyItem => {
        const translationCompanyIdentifier = getTranslationCompanyIdentifier(translationCompanyItem);
        if (translationCompanyIdentifier == null || translationCompanyCollectionIdentifiers.includes(translationCompanyIdentifier)) {
          return false;
        }
        translationCompanyCollectionIdentifiers.push(translationCompanyIdentifier);
        return true;
      });
      return [...translationCompaniesToAdd, ...translationCompanyCollection];
    }
    return translationCompanyCollection;
  }
}
