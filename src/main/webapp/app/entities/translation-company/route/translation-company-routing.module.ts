import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TranslationCompanyComponent } from '../list/translation-company.component';
import { TranslationCompanyDetailComponent } from '../detail/translation-company-detail.component';
import { TranslationCompanyUpdateComponent } from '../update/translation-company-update.component';
import { TranslationCompanyRoutingResolveService } from './translation-company-routing-resolve.service';

const translationCompanyRoute: Routes = [
  {
    path: '',
    component: TranslationCompanyComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TranslationCompanyDetailComponent,
    resolve: {
      translationCompany: TranslationCompanyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TranslationCompanyUpdateComponent,
    resolve: {
      translationCompany: TranslationCompanyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TranslationCompanyUpdateComponent,
    resolve: {
      translationCompany: TranslationCompanyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(translationCompanyRoute)],
  exports: [RouterModule],
})
export class TranslationCompanyRoutingModule {}
