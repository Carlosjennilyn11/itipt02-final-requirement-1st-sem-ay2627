
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
  IonGrid,
  IonRow,
  IonCol,
  AlertController,
  MenuController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  bedOutline,
  calendarOutline,
  logOutOutline,
  personOutline,
  checkmarkOutline,
  closeOutline,
  peopleOutline,
  addCircleOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
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
    RouterLinkActive,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class RoomsPage implements OnInit {

  rooms: any[] = [];

  isLoading: boolean = false;

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private menuCtrl: MenuController,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({
      bedOutline,
      calendarOutline,
      logOutOutline,
      personOutline,
      checkmarkOutline,
      closeOutline,
      peopleOutline,
      addCircleOutline,
      createOutline,
      trashOutline
    });
  }

  ngOnInit() {
    this.loadRooms();
  }

  ionViewWillEnter() {
    this.loadRooms();
  }

  // ==========================================
  // LOAD ROOMS FROM DATABASE
  // ==========================================
  loadRooms() {

    this.isLoading = true;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.authService.getAdminRooms().subscribe({

      next: (response: any) => {

        this.rooms = Array.isArray(response)
          ? response
          : response.rooms || [];

        this.isLoading = false;

        console.log('ADMIN ROOMS:', this.rooms);

        // REFRESH ROOM DISPLAY
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

  // ==========================================
  // ADD NEW ROOM
  // ==========================================
  async addRoom() {

    const alert = await this.alertController.create({

      header: 'Add New Room',

      inputs: [
        {
          name: 'room_name',
          type: 'text',
          placeholder: 'Room Name'
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Room Description'
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'Room Image URL'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price per night'
        },
        {
          name: 'capacity',
          type: 'number',
          placeholder: 'Number of Guests'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add Room',
          handler: (data) => {

            if (
              !data.room_name ||
              !data.description ||
              !data.image ||
              !data.price ||
              !data.capacity
            ) {
              return false;
            }

            const roomData = {
              room_name: data.room_name,
              description: data.description,
              image: data.image,
              price: Number(data.price),
              capacity: Number(data.capacity)
            };

            this.authService.addAdminRoom(roomData).subscribe({

              next: () => {
                this.loadRooms();
              },

              error: (error) => {
                console.error('Error adding room:', error);
                this.showError(
                  error.error?.detail || 'Unable to add room.'
                );
              }

            });

            return true;

          }
        }
      ]

    });

    await alert.present();

  }

  // ==========================================
  // EDIT ROOM
  // ==========================================
  async editRoom(room: any) {

    const alert = await this.alertController.create({

      header: 'Edit Room',

      inputs: [
        {
          name: 'room_name',
          type: 'text',
          value: room.room_name,
          placeholder: 'Room Name'
        },
        {
          name: 'description',
          type: 'textarea',
          value: room.description,
          placeholder: 'Room Description'
        },
        {
          name: 'image',
          type: 'text',
          value: room.image,
          placeholder: 'Room Image URL'
        },
        {
          name: 'price',
          type: 'number',
          value: room.price,
          placeholder: 'Price per night'
        },
        {
          name: 'capacity',
          type: 'number',
          value: room.capacity,
          placeholder: 'Number of Guests'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save Changes',
          handler: (data) => {

            if (
              !data.room_name ||
              !data.description ||
              !data.image ||
              !data.price ||
              !data.capacity
            ) {
              return false;
            }

            const updatedRoom = {
              room_name: data.room_name,
              description: data.description,
              image: data.image,
              price: Number(data.price),
              capacity: Number(data.capacity)
            };

            this.authService.updateAdminRoom(
              Number(room.id),
              updatedRoom
            ).subscribe({

              next: () => {
                this.loadRooms();
              },

              error: (error) => {
                console.error('Error editing room:', error);
                this.showError(
                  error.error?.detail || 'Unable to update room.'
                );
              }

            });

            return true;

          }
        }
      ]

    });

    await alert.present();

  }

  // ==========================================
  // REMOVE ROOM
  // ==========================================
  async removeRoom(room: any) {

    const alert = await this.alertController.create({

      header: 'Remove Room',

      message: `Are you sure you want to remove ${room.room_name}?`,

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {

            this.authService.removeAdminRoom(
              Number(room.id)
            ).subscribe({

              next: () => {
                this.loadRooms();
              },

              error: (error) => {
                console.error('Error removing room:', error);
                this.showError(
                  error.error?.detail || 'Unable to remove room.'
                );
              }

            });

          }
        }
      ]

    });

    await alert.present();

  }

  // ==========================================
  // DISPLAY ERROR
  // ==========================================
  async showError(message: string) {

    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

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
