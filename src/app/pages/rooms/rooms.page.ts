
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  AlertController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonCard,
    IonCardContent,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    CommonModule,
    FormsModule
  ],
})
export class RoomsPage implements OnInit {

  rooms: any[] = [];
  totalRooms: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ starOutline });
  }

  ngOnInit() {
    // Initial setup
  }

  // RELOAD ROOMS WHEN PAGE IS OPENED
  ionViewWillEnter() {
    this.loadRooms();
  }

  // LOAD ACTIVE ROOMS
  loadRooms() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getRooms().subscribe({
      next: (response: any) => {

        console.log('CUSTOMER ROOMS RESPONSE:', response);

        const roomList = Array.isArray(response)
          ? response
          : response.rooms || [];

        this.rooms = roomList
          .filter((room: any) =>
            room.is_active === undefined ||
            room.is_active === 1 ||
            room.is_active === true
          )
          .map((room: any) => ({
            ...room,
            availability: room.availability || 'Available'
          }));

        this.totalRooms = this.rooms.length;
        this.isLoading = false;

        console.log('DISPLAYED ROOMS:', this.rooms);
        console.log('ROOM COUNT:', this.rooms.length);

        // FORCE HTML UPDATE
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading rooms:', error);

        this.errorMessage =
          error.error?.detail ||
          'Unable to load rooms. Please try again.';

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // BOOK ROOM
  async bookRoom(room: any) {

    const alert = await this.alertController.create({
      header: 'Book ' + room.room_name,
      message: 'Please enter your booking details.',

      inputs: [
        {
          name: 'check_in',
          type: 'date',
          placeholder: 'Check-in Date'
        },
        {
          name: 'check_out',
          type: 'date',
          placeholder: 'Check-out Date'
        },
        {
          name: 'guests',
          type: 'number',
          placeholder: 'Number of Guests',
          min: 1,
          max: room.capacity
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Book Now',
          handler: (data) => {

            const checkIn = data.check_in;
            const checkOut = data.check_out;
            const guests = Number(data.guests);

            if (!checkIn || !checkOut || !guests) {
              this.showMessage(
                'Incomplete Details',
                'Please complete all booking information.'
              );
              return false;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const checkInDate = new Date(checkIn + 'T00:00:00');
            const checkOutDate = new Date(checkOut + 'T00:00:00');

            if (checkInDate < today) {
              this.showMessage(
                'Invalid Date',
                'Check-in date cannot be in the past.'
              );
              return false;
            }

            if (checkOutDate <= checkInDate) {
              this.showMessage(
                'Invalid Date',
                'Check-out date must be after check-in date.'
              );
              return false;
            }

            if (guests < 1 || guests > Number(room.capacity)) {
              this.showMessage(
                'Invalid Guests',
                `This room can accommodate 1 to ${room.capacity} guests only.`
              );
              return false;
            }

            this.submitBooking(room, {
              check_in: checkIn,
              check_out: checkOut,
              guests: guests
            });

            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  // SUBMIT BOOKING TO BACKEND
  submitBooking(room: any, bookingData: any) {

    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      this.showMessage(
        'Login Required',
        'Please log in first before booking a room.'
      );
      return;
    }

    let user: any;

    try {
      user = JSON.parse(savedUser);
    } catch {
      this.showMessage(
        'Login Error',
        'Your user information is invalid. Please log in again.'
      );
      return;
    }

    const userId = Number(user.id);

    if (!userId) {
      this.showMessage(
        'Login Error',
        'Unable to identify your account. Please log in again.'
      );
      return;
    }

    const booking = {
      user_id: userId,
      room_id: Number(room.id),
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      guests: Number(bookingData.guests)
    };

    this.authService.createBooking(booking).subscribe({

      next: (response: any) => {

        this.showMessage(
          'Booking Successful',
          response.message || 'Your booking has been submitted successfully. Please wait for admin confirmation.'
        );

        this.loadRooms();
      },

      error: (error) => {

        console.error('Booking error:', error);

        this.showMessage(
          'Booking Failed',
          error.error?.detail ||
          error.error?.message ||
          'Unable to submit your booking. Please try again.'
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
