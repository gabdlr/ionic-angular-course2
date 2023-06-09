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
import { EMPTY, Observable, catchError, of, take } from 'rxjs';
import { BookingsService } from '../../../bookings/bookings.service';
import { AuthService } from '../../../auth/auth.service';
import { MapModalComponent } from '../../../shared/map-modal/map-modal.component';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place$ = of(
    new Place(
      '',
      '',
      '',
      '',
      0,
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
      '',
      null
    )
  );
  userId: string;
  constructor(
    private actionSheetControler: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private bookingsService: BookingsService,
    private modalController: ModalController,
    private navController: NavController,
    private placesService: PlacesService
  ) {
    this.userId = this.authService.userId;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack(['']);
      }
      const place = this.placesService.getPlace(paramMap.get('placeId')!).pipe(
        catchError((err) => {
          this.navController.navigateBack(['/']);
          return EMPTY;
        })
      );
      if (place) {
        this.place$ = place as Observable<Place>;
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

  onShowMap() {
    this.place$.pipe(take(1)).subscribe((place) => {
      let center: unknown;
      if (place.placeLocation?.lat && place.placeLocation.lng) {
        center = { lat: place.placeLocation.lat, lng: place.placeLocation.lng };
      } else {
        center = null;
      }
      this.modalController
        .create({
          component: MapModalComponent,
          componentProps: {
            center,
            selectable: false,
            closeButtonText: 'Close',
            title: place.placeLocation?.address ?? '',
          },
        })
        .then((el) => el.present());
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { place$: this.place$, mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(
        (value: {
          data?: {
            booking: {
              dateFrom: string;
              dateTo: string;
              firstName: string;
              guestsNumber: string;
              lastName: string;
            };
            place: Place;
          };
          role?: string;
        }) => {
          const booking = value.data?.booking;
          const place = value.data?.place;
          if (booking != null && place != null) {
            this.bookingsService.addBooking(booking, place);
          }
        }
      );
  }
}
