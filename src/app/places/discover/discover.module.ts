import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
@NgModule({
  imports: [CommonModule, DiscoverPageRoutingModule, FormsModule, IonicModule],
  declarations: [DiscoverPage],
})
export class DiscoverPageModule {}
