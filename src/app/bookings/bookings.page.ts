import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings$: Observable<Booking[]>;
  constructor(private bookingsService: BookingsService) {
    this.loadedBookings$ = this.bookingsService.bookings;
  }

  ngOnInit() {
    this.bookingsService.fetchBookings();
  }
  onCancelBooking(id: string) {
    this.bookingsService.cancelBooking(id);
  }
}
