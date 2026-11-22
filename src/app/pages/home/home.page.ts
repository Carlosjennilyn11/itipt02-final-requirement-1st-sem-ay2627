
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonButton,
  IonIcon,
  IonImg,
  AlertController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  flameOutline,
  arrowForwardOutline,
  bedOutline,
  calendarOutline,
  starOutline
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCardHeader,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterLink
  ],
})
export class HomePage implements OnInit {

  availableRooms: number = 0;
  totalBookings: number = 0;
  averageRating: number = 0;
  totalReviews: number = 0;

  // AVAILABLE ROOMS
  rooms: any[] = [];
  featuredRooms: any[] = [];

  // CUSTOMER BOOKINGS
  myBookedRooms: any[] = [];

  isLoadingRooms: boolean = false;
  isLoadingBookings: boolean = false;

  errorMessage: string = '';

  // PREVENT DUPLICATE INITIAL LOADING
  private homeDataLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({
      flameOutline,
      arrowForwardOutline,
      bedOutline,
      calendarOutline,
      starOutline
    });
  }

  // ==========================================
  // LOAD DATA WHEN HOME PAGE FIRST OPENS
  // ==========================================
  ngOnInit() {
    this.loadHomeData();
  }

  // ==========================================
  // LOAD HOME DATA
  // ==========================================
  loadHomeData() {

    if (this.homeDataLoaded) {
      return;
    }

    this.homeDataLoaded = true;

    console.log('LOADING HOME DASHBOARD...');

    this.loadDashboard();
    this.loadAvailableRooms();
    this.loadMyBookings();
  }

  // ==========================================
  // REFRESH DATA WHEN RETURNING TO HOME
  // ==========================================
  ionViewWillEnter() {

    if (!this.homeDataLoaded) {
      this.loadHomeData();
    }

  }

  ionViewWillLeave() {
    this.homeDataLoaded = false;
  }

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================
  loadDashboard() {

    this.authService.getHomeDashboard().subscribe({

      next: (response: any) => {

        console.log('HOME DASHBOARD RESPONSE:', response);

        // GET AVAILABLE ROOMS COUNT FROM BACKEND
        this.availableRooms = Number(response.available_rooms || 0);

        this.averageRating = response.average_rating || 0;
        this.totalReviews = response.total_reviews || 0;

        console.log(
          'AVAILABLE ROOMS FROM DASHBOARD:',
          this.availableRooms
        );

        // REFRESH HOME DISPLAY
        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Dashboard loading error:', error);

        this.cdr.detectChanges();
      }

    });

  }

  // ==========================================
  // LOAD AVAILABLE ROOMS AND POPULAR ROOM
  // ==========================================
  loadAvailableRooms() {

    this.isLoadingRooms = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.authService.getRooms().subscribe({

      next: (response: any) => {

        const roomList = Array.isArray(response)
          ? response
          : response.rooms || [];

        // DISPLAY ACTIVE ROOMS ONLY
        this.rooms = roomList.filter((room: any) =>
          room.is_active === undefined ||
          Number(room.is_active) === 1 ||
          room.is_active === true
        );

        // USE THE FIRST ACTIVE ROOM AS FEATURED
        this.featuredRooms = this.rooms.slice(0, 1);

        this.isLoadingRooms = false;

        console.log('ROOM LIST:', this.rooms);
        console.log('FEATURED ROOM:', this.featuredRooms);

        // REFRESH FEATURED ROOM DISPLAY
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Error loading available rooms:', error);

        this.errorMessage =
          error.error?.detail || 'Unable to load available rooms.';

        this.isLoadingRooms = false;

        this.cdr.detectChanges();

      }

    });

  }

  // ==========================================
  // LOAD BOOKINGS OF CURRENT USER
  // ==========================================
  loadMyBookings() {

    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      this.totalBookings = 0;
      this.myBookedRooms = [];
      this.isLoadingBookings = false;
      console.error('No logged-in user found.');
      this.cdr.detectChanges();
      return;
    }

    let user: any;

    try {
      user = JSON.parse(savedUser);
    } catch {
      console.error('Invalid current user information.');
      this.totalBookings = 0;
      this.myBookedRooms = [];
      this.isLoadingBookings = false;
      this.cdr.detectChanges();
      return;
    }

    const userId = Number(user.id);

    if (!userId) {
      console.error('Unable to identify current user.');
      this.totalBookings = 0;
      this.myBookedRooms = [];
      this.isLoadingBookings = false;
      this.cdr.detectChanges();
      return;
    }

    this.isLoadingBookings = true;

    console.log('LOADING BOOKINGS FOR USER ID:', userId);

    this.cdr.detectChanges();

    this.authService.getMyBookings(userId).subscribe({

      next: (response: any) => {

        const bookingList = Array.isArray(response)
          ? response
          : response.bookings || [];

        this.myBookedRooms = bookingList.map((booking: any) => ({

          id: booking.id,
          bookingId: booking.booking_code,
          roomName: booking.room_name,
          image: booking.image,
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          guests: booking.guests,
          totalPrice: Number(booking.total_price),
          status: booking.status

        }));

        // GET TOTAL BOOKINGS FROM CURRENT USER
        this.totalBookings = Number(
          response.total_bookings ?? this.myBookedRooms.length
        );

        this.isLoadingBookings = false;

        console.log('MY BOOKED ROOMS:', this.myBookedRooms);
        console.log('MY TOTAL BOOKINGS:', this.totalBookings);

        // REFRESH BOOKINGS DISPLAY
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Error loading customer bookings:', error);

        this.isLoadingBookings = false;

        this.cdr.detectChanges();

      }

    });

  }

  // ==========================================
  // BOOK FEATURED ROOM
  // ==========================================
  async bookRoom(room: any) {

    const today = new Date().toISOString().split('T')[0];

    const alert = await this.alertController.create({

      header: `Book ${room.room_name}`,
      message: 'Enter your booking details.',

      inputs: [
        {
          name: 'check_in',
          type: 'date',
          min: today,
          placeholder: 'Check-in Date'
        },
        {
          name: 'check_out',
          type: 'date',
          min: today,
          placeholder: 'Check-out Date'
        },
        {
          name: 'guests',
          type: 'number',
          min: 1,
          max: room.capacity,
          value: 1,
          placeholder: 'Number of Guests'
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
              this.showBookingMessage(
                'Invalid Booking',
                'Please complete all booking details.'
              );
              return false;
            }

            if (checkIn < today) {
              this.showBookingMessage(
                'Invalid Date',
                'Check-in date cannot be in the past.'
              );
              return false;
            }

            if (checkOut <= checkIn) {
              this.showBookingMessage(
                'Invalid Date',
                'Check-out must be later than check-in.'
              );
              return false;
            }

            if (guests < 1 || guests > Number(room.capacity)) {
              this.showBookingMessage(
                'Invalid Guests',
                `This room can accommodate up to ${room.capacity} guests.`
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

  // ==========================================
  // SUBMIT BOOKING TO BACKEND
  // ==========================================
  submitBooking(room: any, bookingData: any) {

    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
      this.showBookingMessage(
        'Login Required',
        'Please log in before booking a room.'
      );
      return;
    }

    let user: any;

    try {
      user = JSON.parse(currentUser);
    } catch (error) {
      this.showBookingMessage(
        'Error',
        'Unable to retrieve your account information.'
      );
      return;
    }

    if (!user?.id) {
      this.showBookingMessage(
        'Error',
        'User ID was not found. Please log in again.'
      );
      return;
    }

    const booking = {
      user_id: Number(user.id),
      room_id: Number(room.id),
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      guests: Number(bookingData.guests)
    };

    this.authService.createBooking(booking).subscribe({

      next: async (response: any) => {

        const alert = await this.alertController.create({

          header: 'Booking Successful!',

          message: response.message ||
            'Your booking has been submitted and is waiting for confirmation.',

          buttons: ['OK']

        });

        await alert.present();

        // RELOAD HOME DATA AFTER BOOKING
        this.loadDashboard();
        this.loadMyBookings();
        this.loadAvailableRooms();

      },

      error: (error) => {

        console.error('Booking Error:', error);

        const message =
          error.error?.detail ||
          error.error?.message ||
          'Unable to complete your booking. Please try again.';

        this.showBookingMessage('Booking Failed', message);

      }

    });

  }

  // ==========================================
  // BOOKING ALERT MESSAGE
  // ==========================================
  async showBookingMessage(header: string, message: string) {

    const alert = await this.alertController.create({

      header: header,
      message: message,
      buttons: ['OK']

    });

    await alert.present();

  }

}
