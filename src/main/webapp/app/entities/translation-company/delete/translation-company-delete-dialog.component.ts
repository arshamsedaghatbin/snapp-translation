import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITranslationCompany } from '../translation-company.model';
import { TranslationCompanyService } from '../service/translation-company.service';

@Component({
  templateUrl: './translation-company-delete-dialog.component.html',
})
export class TranslationCompanyDeleteDialogComponent {
  translationCompany?: ITranslationCompany;

  constructor(protected translationCompanyService: TranslationCompanyService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.translationCompanyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
