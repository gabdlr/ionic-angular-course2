import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OfferFormComponent } from './offer-form/offer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OffersPageRoutingModule,
  ],
  declarations: [OffersPage, OfferItemComponent],
})
export class OffersPageModule {}
