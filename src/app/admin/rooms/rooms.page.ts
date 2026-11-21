
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline, peopleOutline, addCircleOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg, CommonModule, FormsModule, RouterLink, RouterLinkActive, IonGrid, IonRow, IonCol],
})
export class RoomsPage {
  constructor() {
    addIcons({ bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline, peopleOutline, addCircleOutline, createOutline, trashOutline });
  }
}
