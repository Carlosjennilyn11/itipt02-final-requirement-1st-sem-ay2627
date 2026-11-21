
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent, IonBadge, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, receiptOutline, peopleOutline, cardOutline, checkmarkOutline, checkmarkCircleOutline, checkmarkCircle, timeOutline, time, closeCircleOutline, closeCircle, refreshOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent, IonBadge, IonButton, IonIcon, CommonModule, FormsModule],
})
export class MyBookingsPage implements OnInit {

  bookings = signal([
    {
      id: 1,
      bookingId: 'CJK-10234',
      roomName: 'Deluxe Room',
      image: 'https://i.pinimg.com/736x/77/5e/98/775e98179f7570baf0c9f9869405bffc.jpg',
      checkIn: 'Nov 20, 2026',
      checkOut: 'Nov 22, 2026',
      guests: 2,
      totalPrice: 4000,
      status: 'Confirmed'
    },
    {
      id: 2,
      bookingId: 'CJK-10567',
      roomName: 'Family Room',
      image: 'https://i.pinimg.com/736x/77/5e/98/775e98179f7570baf0c9f9869405bffc.jpg',
      checkIn: 'Nov 25, 2026',
      checkOut: 'Nov 27, 2026',
      guests: 3,
      totalPrice: 5500,
      status: 'Pending'
    },
    {
      id: 3,
      bookingId: 'CJK-10789',
      roomName: 'Standard Room',
      image: 'https://i.pinimg.com/1200x/3b/09/42/3b0942f7dffe3cfe9b83208105f086bf.jpg',
      checkIn: 'Nov 15, 2026',
      checkOut: 'Nov 17, 2026',
      guests: 2,
      totalPrice: 3000,
      status: 'Cancelled'
    }
  ]);

  selectedFilter: string = 'all';

  constructor() {
    addIcons({ calendarOutline, receiptOutline, peopleOutline, cardOutline, checkmarkOutline, checkmarkCircleOutline, checkmarkCircle, timeOutline, time, closeCircleOutline, closeCircle, refreshOutline, starOutline });
  }

  ngOnInit() {}

  onFilterChange(event: any) {
    this.selectedFilter = String(event.detail.value).toLowerCase();
  }

  filteredBookings() {
    const allBookings = this.bookings();

    if (this.selectedFilter === 'all') {
      return allBookings;
    }

    return allBookings.filter((booking) =>
      booking.status.toLowerCase() === this.selectedFilter
    );
  }

}
