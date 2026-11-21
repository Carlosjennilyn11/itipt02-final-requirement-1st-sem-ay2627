
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  imports: [IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule],
})
export class RoomsPage implements OnInit {

  rooms: any[] = [];
  totalRooms: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService
  ) {
    addIcons({ starOutline });
  }

  ngOnInit() {
    this.loadRooms();
  }

  // ==========================================
  // GET ROOMS FROM DATABASE
  // ==========================================
  loadRooms() {

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getRooms().subscribe({

      next: (response: any) => {

        this.rooms = response.rooms || [];
        this.totalRooms = response.total_rooms || 0;

        this.isLoading = false;

      },

      error: (error) => {

        console.error('Error loading rooms:', error);

        this.errorMessage = 'Unable to load rooms. Please try again.';

        this.isLoading = false;

      }

    });

  }

}
