import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOfferPageRoutingModule } from './edit-offer-routing.module';

import { EditOfferPage } from './edit-offer.page';
import { OfferFormComponent } from '../offer-form/offer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOfferPageRoutingModule,
    OfferFormComponent,
  ],
  declarations: [EditOfferPage],
})
export class EditOfferPageModule {}
