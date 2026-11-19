import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonIcon, IonButton, IonTitle, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, businessOutline, locateOutline, eyeOutline, bedOutline, wifiOutline, restaurantOutline, shieldCheckmarkOutline, checkmarkCircle, location, mail, call, logoFacebook, logoInstagram, logoTiktok, logoYoutube } from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton, IonTitle, IonFooter, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class AboutPage implements OnInit {
  constructor() {
    addIcons({
      arrowForwardOutline,
      businessOutline, locateOutline, eyeOutline, bedOutline, wifiOutline,
      restaurantOutline, shieldCheckmarkOutline, checkmarkCircle, location,
      mail, call, logoFacebook, logoInstagram, logoTiktok, logoYoutube
    });
  }

  ngOnInit() {}
}