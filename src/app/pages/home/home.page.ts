
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonButton, IonIcon } from '@ionic/angular';
import { IonImg } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { flameOutline, arrowForwardOutline, bedOutline, calendarOutline, starOutline } from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonButton, IonIcon, CommonModule, FormsModule],
})
export class HomePage implements OnInit {

  availableRooms: number = 0;
  totalBookings: number = 0;
  averageRating: number = 0;
  totalReviews: number = 0;

  constructor(private authService: AuthService) {
    addIcons({ flameOutline, arrowForwardOutline, bedOutline, calendarOutline, starOutline})
  }

  ngOnInit() {
    this.loadDashboard();
  }

  // ==========================================
  // LOAD HOME DASHBOARD DATA
  // ==========================================
  loadDashboard() {
    this.authService.getHomeDashboard().subscribe({
      next: (response) => {
        this.availableRooms = response.available_rooms;
        this.totalBookings = response.total_bookings;
        this.averageRating = response.average_rating;
        this.totalReviews = response.total_reviews;
      },
      error: (error) => {
        console.error('Dashboard loading error:', error);
      }
    });
  }

}
