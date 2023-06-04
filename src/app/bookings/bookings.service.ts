import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../places/place';
import { AuthService } from '../auth/auth.service';
import { LoadingController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookings = new BehaviorSubject<Booking[]>([]);
  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {}
  get bookings() {
    return this._bookings.asObservable();
  }
  addBooking(
    booking: {
      dateFrom: string;
      dateTo: string;
      firstName: string;
      guestsNumber: string;
      lastName: string;
    },
    place: Place
  ) {
    const newBooking = new Booking(
      new Date(booking.dateFrom),
      new Date(booking.dateTo),
      booking.firstName,
      Number(booking.guestsNumber),
      Math.random().toString(),
      booking.lastName,
      place.id,
      place.imageURL,
      place.title,
      this.authService.userId
    );
    this.loadingController.create({ message: 'Booking...' }).then((el) => {
      el.present();
      setTimeout(() => {
        this._bookings.next([...this._bookings.getValue(), newBooking]);
        el.dismiss();
        this.navController.navigateRoot(['/bookings']);
      }, 1000);
    });
  }
  cancelBooking(bookingId: string) {
    const bookingList = [...this._bookings.getValue()];
    const newBookingList = bookingList.filter(
      (booking) => booking.id !== bookingId
    );
    this._bookings.next(newBookingList);
  }
}
