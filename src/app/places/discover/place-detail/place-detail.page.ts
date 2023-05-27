import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place = new Place('', '', '', '', 0);
  constructor(
    private actionSheetControler: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private navController: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack(['']);
      }
      const place = this.placesService.getPlace(paramMap.get('placeId')!);
      if (place) {
        this.place = place;
      } else {
        this.navController.navigateBack(['']);
      }
    });
  }

  onBookPlace() {
    this.actionSheetControler
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select date',
            handler: () => this.openBookingModal('select'),
          },
          {
            text: 'Random date',
            handler: () => this.openBookingModal('random'),
          },
          { text: 'Cancel', role: 'cancel' },
        ],
      })
      .then((actionSheetElement) => {
        actionSheetElement.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { place: this.place },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then();
  }
}
