import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Place } from '../places/place';
import { AuthService } from '../auth/auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
interface BookingDTO {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookings = new BehaviorSubject<Booking[]>([]);
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
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
    if (place.id) {
      const newBooking = new Booking(
        new Date(booking.dateFrom),
        new Date(booking.dateTo),
        booking.firstName,
        Number(booking.guestsNumber),
        null,
        booking.lastName,
        place.id,
        place.imageURL,
        place.title,
        this.authService.userId
      );
      this.loadingController.create({ message: 'Booking...' }).then((el) => {
        el.present();
        this.httpClient
          .post<{ name: string }>(
            `${environment.firebaseURL}bookings.json`,
            newBooking
          )
          .subscribe({
            next: (res) => {
              newBooking.id = res.name;
              this._bookings.next([...this._bookings.getValue(), newBooking]);
              el.dismiss();
              this.navController.navigateRoot(['/bookings']);
            },
          });
      });
    }
  }
  cancelBooking(bookingId: string) {
    this.loadingController
      .create({ message: 'Cancelling booking...' })
      .then((el) => {
        el.present();
        this.httpClient
          .delete(`${environment.firebaseURL}bookings/${bookingId}.json`)
          .subscribe({
            next: () => {
              const bookingList = [...this._bookings.getValue()];
              const newBookingList = bookingList.filter(
                (booking) => booking.id !== bookingId
              );
              this._bookings.next(newBookingList);
              el.dismiss();
            },
            error: () => el.dismiss(),
          });
      });
  }

  fetchBookings() {
    this.httpClient
      .get<{ [key: string]: BookingDTO }>(
        `${environment.firebaseURL}bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map((bookingsDTO) => {
          const bookings: Booking[] = [];
          for (let key in bookingsDTO) {
            const bookingObj = bookingsDTO[key];
            const booking = new Booking(
              new Date(bookingObj.bookedFrom),
              new Date(bookingObj.bookedTo),
              bookingObj.firstName,
              bookingObj.guestNumber,
              key,
              bookingObj.lastName,
              bookingObj.placeId,
              bookingObj.placeImage,
              bookingObj.placeTitle,
              bookingObj.userId
            );
            bookings.push(booking);
          }
          return bookings;
        }),
        tap((bookings) => this._bookings.next(bookings))
      )
      .subscribe();
  }
}
