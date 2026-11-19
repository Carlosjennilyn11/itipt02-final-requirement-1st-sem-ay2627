
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonButton, IonIcon } from '@ionic/angular';
import { IonImg } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { flameOutline, arrowForwardOutline, bedOutline, calendarOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonButton, IonIcon, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  constructor() {
    addIcons({ flameOutline, arrowForwardOutline, bedOutline, calendarOutline, starOutline})
  }

  ngOnInit() {}
}
