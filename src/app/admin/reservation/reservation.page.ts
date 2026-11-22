
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonMenuToggle,
  IonSplitPane,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  IonBadge,
  IonImg,
  MenuController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  bedOutline,
  calendarOutline,
  logOutOutline,
  personOutline,
  checkmarkOutline,
  closeOutline
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonMenuToggle,
    IonSplitPane,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton,
    IonBadge,
    IonImg,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
})
export class ReservationPage implements OnInit {

  reservations: any[] = [];

  selectedFilter: string = 'All';

  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({
      bedOutline,
      calendarOutline,
      logOutOutline,
      personOutline,
      checkmarkOutline,
      closeOutline
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');
    this.loadReservations();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  // ==========================================
  // LOAD RESERVATIONS FROM DATABASE
  // ==========================================
  loadReservations() {

    this.isLoading = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.authService.getAdminReservations().subscribe({

      next: (response: any) => {

        // SUPPORT ARRAY OR OBJECT RESPONSE
        this.reservations = Array.isArray(response)
          ? response
          : response.reservations || [];

        this.isLoading = false;

        console.log('ADMIN RESERVATIONS:', this.reservations);

        // REFRESH RESERVATION DISPLAY
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Error loading reservations:', error);

        this.errorMessage =
          error.error?.detail ||
          'Unable to load reservations. Please try again.';

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });

  }

  // ==========================================
  // FILTER RESERVATIONS
  // ==========================================
  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.cdr.detectChanges();
  }

  get filteredReservations(): any[] {

    if (this.selectedFilter === 'All') {
      return this.reservations;
    }

    return this.reservations.filter(reservation =>
      reservation.status?.toLowerCase() ===
      this.selectedFilter.toLowerCase()
    );

  }

  // ==========================================
  // ACCEPT RESERVATION
  // ==========================================
  acceptReservation(bookingId: number) {
    this.changeReservationStatus(bookingId, 'Confirmed');
  }

  // ==========================================
  // DECLINE RESERVATION
  // ==========================================
  declineReservation(bookingId: number) {
    this.changeReservationStatus(bookingId, 'Declined');
  }

  // ==========================================
  // UPDATE RESERVATION STATUS
  // ==========================================
  changeReservationStatus(
    bookingId: number,
    status: 'Confirmed' | 'Declined'
  ) {

    this.authService.updateAdminReservationStatus(
      bookingId,
      status
    ).subscribe({

      next: () => {

        // RELOAD UPDATED RESERVATIONS
        this.loadReservations();

      },

      error: (error) => {

        console.error('Error updating reservation:', error);

        this.errorMessage =
          error.error?.detail ||
          'Unable to update reservation status.';

        this.cdr.detectChanges();

      }

    });

  }

  // ==========================================
  // ADMIN LOGOUT
  // ==========================================
  async logout() {

    await this.menuCtrl.close();

    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentUser');

    this.router.navigateByUrl('/');

  }

}
