import { Injectable } from '@angular/core';
import { BookingItem } from './booking-item';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  bookings: BookingItem[];

  getLocalStorage(): any {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  getBookings(): BookingItem[] {
    return this.bookings;
  }

  updateLocalStorage(): void {
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }

  removeFromBookings(name: string) {
    this.bookings = this.bookings.filter((item) => item.name !== name);
    console.log(this.bookings);
    this.updateLocalStorage();
  }

  addToBookings(name: string, date: string, time: string, email: string) {
    const item: BookingItem = {
      name: name,
      date: date,
      time: time,
      email: email,
    };
    this.bookings.push(item);
    this.updateLocalStorage();
  }
  existBooking(name: string): boolean {
    for (var i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].name === name) {
        return true;
      }
    }
    return false;
  }

  isLocalStorageEmpty(): boolean {
    return this.bookings.length === 0;
  }

  constructor() {
    this.bookings = this.getLocalStorage();
  }
}
