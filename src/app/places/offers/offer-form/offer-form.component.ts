import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  imports: [IonicModule, ReactiveFormsModule, NgIf, SharedModule],
  selector: 'app-offer-form',
  standalone: true,
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  @Input() minDate = new Date().toISOString();
  @Input({ required: true }) form!: FormGroup<{
    title: FormControl<null | string>;
    description: FormControl<null | string>;
    price: FormControl<null | number>;
    dateFrom: FormControl<null | string>;
    dateTo: FormControl<null | string>;
  }>;
  constructor() {}

  ngOnInit() {}
}
