
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonImg,
  IonLabel
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  personCircleOutline,
  personOutline,
  cameraOutline,
  mailOutline,
  callOutline,
  locationOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonImg,
    IonLabel
  ],
})
export class ProfilePage implements OnInit {

  constructor() {
    addIcons({
      personCircleOutline,
      personOutline,
      cameraOutline,
      mailOutline,
      callOutline,
      locationOutline
    });
  }

  ngOnInit() {}

}
