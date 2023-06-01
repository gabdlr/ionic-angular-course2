import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';
import { NewOfferPage } from './new-offer.page';
import { OfferFormComponent } from '../offer-form/offer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOfferPageRoutingModule,
    ReactiveFormsModule,
    OfferFormComponent,
  ],
  declarations: [NewOfferPage],
})
export class NewOfferPageModule {}
