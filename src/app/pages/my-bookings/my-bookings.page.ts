
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  calendarOutline,
  receiptOutline,
  peopleOutline,
  cardOutline,
  checkmarkOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  timeOutline,
  time,
  closeCircleOutline,
  closeCircle,
  refreshOutline,
  starOutline
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonBadge,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule
  ],
})
export class MyBookingsPage implements OnInit {

  bookings = signal<any[]>([]);

  selectedFilter: string = 'all';

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({
      calendarOutline,
      receiptOutline,
      peopleOutline,
      cardOutline,
      checkmarkOutline,
      checkmarkCircleOutline,
      checkmarkCircle,
      timeOutline,
      time,
      closeCircleOutline,
      closeCircle,
      refreshOutline,
      starOutline
    });
  }

  ngOnInit() {
    // Initial setup
  }

  // RELOAD BOOKINGS WHEN PAGE IS OPENED
  ionViewWillEnter() {
    this.loadMyBookings();
  }

  // LOAD CUSTOMER BOOKINGS
  loadMyBookings() {

    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      this.errorMessage = 'Please log in first to view your bookings.';
      return;
    }

    let user: any;

    try {
      user = JSON.parse(savedUser);
    } catch {
      this.errorMessage = 'Invalid user information. Please log in again.';
      return;
    }

    const userId = Number(user.id);

    if (!userId) {
      this.errorMessage = 'Unable to identify your account. Please log in again.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getMyBookings(userId).subscribe({

      next: (response: any) => {

        console.log('MY BOOKINGS RESPONSE:', response);

        const bookingList = Array.isArray(response)
          ? response
          : response.bookings || [];

        const formattedBookings = bookingList.map((booking: any) => ({

          id: booking.id,

          bookingId: booking.booking_code,

          roomName: booking.room_name,

          image: booking.image,

          checkIn: this.formatDate(booking.check_in),

          checkOut: this.formatDate(booking.check_out),

          guests: booking.guests,

          totalPrice: Number(booking.total_price),

          status: booking.status

        }));

        this.bookings.set(formattedBookings);

        console.log('CUSTOMER BOOKINGS DISPLAYED:', this.bookings());

        this.isLoading = false;
      },

      error: (error) => {

        console.error('Error loading bookings:', error);

        this.errorMessage =
          error.error?.detail ||
          'Unable to load your bookings. Please try again.';

        this.isLoading = false;
      }

    });
  }

  // FORMAT DATE
  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    const parsedDate = new Date(date + 'T00:00:00');

    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  // FILTER BOOKINGS
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

  // CANCEL BOOKING
  async cancelBooking(booking: any) {

    const alert = await this.alertController.create({

      header: 'Cancel Booking',

      message: `Are you sure you want to cancel booking ${booking.bookingId}?`,

      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel',
          handler: () => {
            this.confirmCancelBooking(booking);
          }
        }
      ]

    });

    await alert.present();
  }

  // CONFIRM CANCELLATION
  confirmCancelBooking(booking: any) {

    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      this.showMessage(
        'Login Required',
        'Please log in again.'
      );
      return;
    }

    let user: any;

    try {
      user = JSON.parse(savedUser);
    } catch {
      this.showMessage(
        'Login Error',
        'Invalid user information.'
      );
      return;
    }

    const userId = Number(user.id);

    if (!userId) {
      this.showMessage(
        'Login Error',
        'Unable to identify your account.'
      );
      return;
    }

    this.authService.cancelBooking(
      Number(booking.id),
      userId
    ).subscribe({

      next: (response: any) => {

        this.showMessage(
          'Booking Cancelled',
          response.message || 'Your booking has been cancelled successfully.'
        );

        this.loadMyBookings();
      },

      error: (error) => {

        console.error('Cancel booking error:', error);

        this.showMessage(
          'Cancellation Failed',
          error.error?.detail ||
          'Unable to cancel your booking. Please try again.'
        );
      }

    });
  }

  // SHOW MESSAGE
  async showMessage(header: string, message: string) {

    const alert = await this.alertController.create({

      header: header,

      message: message,

      buttons: ['OK']

    });

    await alert.present();
  }

}
