import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TranslationCompanyComponent } from './list/translation-company.component';
import { TranslationCompanyDetailComponent } from './detail/translation-company-detail.component';
import { TranslationCompanyUpdateComponent } from './update/translation-company-update.component';
import { TranslationCompanyDeleteDialogComponent } from './delete/translation-company-delete-dialog.component';
import { TranslationCompanyRoutingModule } from './route/translation-company-routing.module';

@NgModule({
  imports: [SharedModule, TranslationCompanyRoutingModule],
  declarations: [
    TranslationCompanyComponent,
    TranslationCompanyDetailComponent,
    TranslationCompanyUpdateComponent,
    TranslationCompanyDeleteDialogComponent,
  ],
  entryComponents: [TranslationCompanyDeleteDialogComponent],
})
export class TranslationCompanyModule {}
