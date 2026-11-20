
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
    { id: 1, bookingId: 'CJK-10234', roomName: 'Deluxe Room', image: 'assets/img/deluxe-room.jpg', checkIn: 'Nov 20, 2026', checkOut: 'Nov 22, 2026', guests: 2, totalPrice: 4000, status: 'Confirmed' },
    { id: 2, bookingId: 'CJK-09876', roomName: 'Standard Room', image: 'assets/img/standard-room.jpg', checkIn: 'Nov 10, 2026', checkOut: 'Nov 12, 2026', guests: 2, totalPrice: 3000, status: 'Completed' }
  ]);
  constructor() {
    addIcons({ calendarOutline, receiptOutline, peopleOutline, cardOutline, checkmarkOutline, checkmarkCircleOutline, checkmarkCircle, timeOutline, time, closeCircleOutline, closeCircle, refreshOutline, starOutline });
  }
  ngOnInit() {}
}
