import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];
  constructor(private bookingsService: BookingsService) {
    this.loadedBookings = this.bookingsService.bookings;
  }

  ngOnInit() {}
  onCancelBooking(id: string) {
    this.bookingsService.cancelBooking(id);
  }
}
