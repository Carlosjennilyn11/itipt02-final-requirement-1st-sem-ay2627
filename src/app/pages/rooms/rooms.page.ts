
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {starOutline} from 'ionicons/icons';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  imports: [IonGrid,  IonRow, IonCol, IonButton, IonCard, IonCardContent, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, CommonModule, FormsModule],
})
export class RoomsPage implements OnInit {
  constructor() {
    addIcons({starOutline })
  }

  ngOnInit() {}
}
