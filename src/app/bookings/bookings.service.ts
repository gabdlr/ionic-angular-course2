import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private _bookings: Booking[] = [
    new Booking(1, 'xyz', '1', 'Manhattan Mansion', 'abc'),
  ];
  constructor() {}
  get bookings() {
    return [...this._bookings];
  }

  cancelBooking(bookingId: string) {
    this._bookings = this.bookings.filter(
      (booking) => booking.id !== bookingId
    );
    console.log(this._bookings);
  }
}
