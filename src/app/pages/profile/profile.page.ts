
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

  firstName: string = '';
  lastName: string = '';
  fullName: string = '';
  email: string = '';
  username: string = '';
  role: string = '';

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

  ngOnInit() {
    this.loadProfile();
  }

  ionViewWillEnter() {
    this.loadProfile();
  }

  // LOAD USER INFORMATION
  loadProfile() {

    const userData = localStorage.getItem('currentUser');

    if (userData) {

      const user = JSON.parse(userData);

      this.firstName = user.first_name || '';
      this.lastName = user.last_name || '';
      this.fullName = `${this.firstName} ${this.lastName}`.trim();
      this.email = user.email || '';
      this.username = user.username || '';
      this.role = user.role || '';

    } else {

      this.firstName = '';
      this.lastName = '';
      this.fullName = '';
      this.email = '';
      this.username = '';
      this.role = '';

    }
  }

}
