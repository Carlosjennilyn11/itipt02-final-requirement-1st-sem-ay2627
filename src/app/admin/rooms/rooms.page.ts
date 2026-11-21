
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg, CommonModule, FormsModule],
})
export class RoomsPage {
  constructor() {
    addIcons({ bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline });
  }
}
