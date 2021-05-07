import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order',
        data: { pageTitle: 'snappTranslationApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'delivery',
        data: { pageTitle: 'snappTranslationApp.delivery.home.title' },
        loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
      },
      {
        path: 'delivery-time-slot',
        data: { pageTitle: 'snappTranslationApp.deliveryTimeSlot.home.title' },
        loadChildren: () => import('./delivery-time-slot/delivery-time-slot.module').then(m => m.DeliveryTimeSlotModule),
      },
      {
        path: 'document',
        data: { pageTitle: 'snappTranslationApp.document.home.title' },
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule),
      },
      {
        path: 'location',
        data: { pageTitle: 'snappTranslationApp.location.home.title' },
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
      },
      {
        path: 'category',
        data: { pageTitle: 'snappTranslationApp.category.home.title' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'sub-category',
        data: { pageTitle: 'snappTranslationApp.subCategory.home.title' },
        loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule),
      },
      {
        path: 'invoice',
        data: { pageTitle: 'snappTranslationApp.invoice.home.title' },
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: 'translation-company',
        data: { pageTitle: 'snappTranslationApp.translationCompany.home.title' },
        loadChildren: () => import('./translation-company/translation-company.module').then(m => m.TranslationCompanyModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
