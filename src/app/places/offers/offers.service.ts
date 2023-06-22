import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaceLocation } from '../location.model';

@Injectable()
export class OffersService {
  constructor() {}
  form = new FormGroup({
    title: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    description: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.maxLength(180)],
    }),
    price: new FormControl<null | number>(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.min(1)],
    }),
    dateFrom: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    dateTo: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    location: new FormControl<null | PlaceLocation>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    image: new FormControl<null | Blob>(null, [Validators.required]),
  });
}
