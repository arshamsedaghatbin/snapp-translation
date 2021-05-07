import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITranslationCompany } from '../translation-company.model';

@Component({
  selector: 'jhi-translation-company-detail',
  templateUrl: './translation-company-detail.component.html',
})
export class TranslationCompanyDetailComponent implements OnInit {
  translationCompany: ITranslationCompany | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ translationCompany }) => {
      this.translationCompany = translationCompany;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
