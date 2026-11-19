
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { addIcons } from 'ionicons';
import {
  logOutOutline,
  businessOutline,
  personCircle,
  chevronDownOutline,
  home,
  bed,
  calendar,
  person,
  informationCircle
} from 'ionicons/icons';

import {
  IonImg,
  IonFooter,
  IonToolbar,
  IonButton,
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle
} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IonImg,
    IonFooter,
    IonToolbar,
    IonButton,
    CommonModule,
    RouterModule,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle
  ],
})

export class AppComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';

  constructor(private router: Router) {

    addIcons({
      logOutOutline,
      businessOutline,
      personCircle,
      chevronDownOutline,
      home,
      bed,
      calendar,
      person,
      informationCircle
    });

  }

  ngOnInit() {

    // LOAD USER INFORMATION
    this.loadUser();

    // UPDATE NAME WHEN NAVIGATING
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd =>
          event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.loadUser();
      });

  }

  // GET FIRST NAME AND LAST NAME
  loadUser() {

    const userData = localStorage.getItem('currentUser');

    if (userData) {

      const user = JSON.parse(userData);

      this.firstName = user.first_name || '';
      this.lastName = user.last_name || '';

    } else {

      this.firstName = '';
      this.lastName = '';

    }

  }

  // LOGOUT FUNCTION
  logout() {

    localStorage.removeItem('currentUser');

    this.firstName = '';
    this.lastName = '';

    this.router.navigateByUrl('/main');

  }

}
