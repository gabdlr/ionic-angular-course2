import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../places/place';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    lastName: new FormControl<null | string>(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    guestsNumber: new FormControl<null | string>('2', {
      updateOn: 'blur',
      validators: [Validators.required],
    }),
    dateFrom: new FormControl<null | string>(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    dateTo: new FormControl<null | string>(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });
  @Input() place: Place = new Place(
    '',
    '',
    '',
    '',
    0,
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  @Input() mode: 'select' | 'random' = 'select';
  constructor(private modalController: ModalController) {
    this.form.patchValue({ dateFrom: this.place.availableFrom.toISOString() });
  }

  ngOnInit() {
    if (this.mode === 'random') {
      const availableFrom = this.place.availableFrom;
      const availableTo = this.place.availableTo;
      const randomStart = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() +
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      );
      const randomEnd = new Date(
        randomStart.getTime() + (Math.random() * 5 + 1) * 24 * 60 * 60 * 1000
      );

      this.form.patchValue({
        dateFrom: randomStart.toISOString(),
        dateTo: randomEnd.toISOString(),
      });
    }
  }
  onBookPlace() {
    this.modalController.dismiss(this.form.value, 'confirm');
  }
  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  datesValidation() {
    if (this.form.value.dateTo && this.form.value.dateFrom) {
      const dateFrom = new Date(this.form.value.dateFrom);
      const dateTo = new Date(this.form.value.dateTo);
      return dateFrom.getTime() > dateTo.getTime();
    }
    return true;
  }
}
