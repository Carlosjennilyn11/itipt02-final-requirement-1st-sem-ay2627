
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg, MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonSplitPane, IonList, IonItem, IonLabel, IonIcon, IonCard, IonCardContent, IonButton, IonBadge, IonImg, CommonModule, FormsModule, RouterLink, RouterLinkActive],
})
export class ReservationPage implements OnInit {
  constructor(private menuCtrl: MenuController) {
    addIcons({ bedOutline, calendarOutline, logOutOutline, personOutline, checkmarkOutline, closeOutline });
  }
  ngOnInit() {}
  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }
}
