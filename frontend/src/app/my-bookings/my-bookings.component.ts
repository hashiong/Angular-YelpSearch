import { Component, OnInit } from '@angular/core';
import { BookingItem } from '../booking-item';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingItem[] = [];

  constructor(private bookService: BookingsService) {}

  isBookingEmpty(): boolean {
    return this.bookings.length === 0;
  }

  deleteBooking(name: string) {
    this.bookService.removeFromBookings(name);
    this.bookings = this.bookService.getBookings();
    alert('Reservation cancelled!');
  }

  ngOnInit(): void {
    this.bookings = this.bookService.getBookings();
  }
}
