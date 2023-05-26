import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../places/place';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() place: Place = new Place('', '', '', '', 0);
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  onBookPlace() {
    this.modalController.dismiss({ message: 'dummy msg' }, 'confirm');
  }
  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
