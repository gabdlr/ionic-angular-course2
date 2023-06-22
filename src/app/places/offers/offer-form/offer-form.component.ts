import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { PlaceLocation } from '../../location.model';
import base64toBlob from '../../../utils/base64toBlob';

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
    location: FormControl<null | PlaceLocation>;
    image: FormControl<any>;
  }>;
  constructor() {}

  ngOnInit() {}

  onImagePicked(image: string) {
    try {
      const separator = image.search(',') + 1;
      const newImage = image.substring(separator);
      const fileImage = base64toBlob(newImage, 'image/jpeg');
      this.form.patchValue({ image: fileImage });
    } catch (err) {
      //handle error
    }
  }
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location });
  }
}
