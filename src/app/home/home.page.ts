
import { Component } from '@angular/core';
import {
  IonInput,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  MenuController,
  AlertController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  logIn,
  lockClosed,
  mail,
  businessOutline
} from 'ionicons/icons';

import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    CommonModule,
    NgIf,
    IonInput,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
})
export class HomePage {

  email: string = '';
  password: string = '';

  activeRole: string = 'admin';

  switchRole(role: string) {
    this.activeRole = role;

    // CLEAR INPUT FIELDS WHEN SWITCHING ROLE
    this.email = '';
    this.password = '';
  }

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {

    addIcons({
      logIn,
      lockClosed,
      mail,
      businessOutline
    });

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');

    // CLEAR INPUT FIELDS WHEN PAGE OPENS
    this.email = '';
    this.password = '';
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  async login() {

    if (!this.email || !this.password) {

      const alert = await this.alertController.create({
        header: 'Required Fields',
        message: 'Please enter your email and password.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password,
      role: this.activeRole
    };

    this.authService.login(loginData).subscribe({

      next: async (response) => {

        // CLEAR INPUT FIELDS
        this.email = '';
        this.password = '';

        // CHECK ACCOUNT ROLE
        if (response.user?.role !== this.activeRole) {

          const alert = await this.alertController.create({
            header: 'Login Failed',
            message: 'Your account does not match the selected role.',
            buttons: ['OK']
          });

          await alert.present();
          return;
        }

        // SAVE USER INFORMATION FOR MENU BAR
        localStorage.setItem('currentUser', JSON.stringify({
          first_name: response.user?.first_name || '',
          last_name: response.user?.last_name || '',
          role: response.user?.role || ''
        }));

        // SUCCESSFUL LOGIN
        const alert = await this.alertController.create({
          header: 'Login Successful',
          message: `Welcome ${response.user?.first_name || 'User'}!`,
          buttons: [
            {
              text: 'Continue',
              handler: () => {

                // USER DASHBOARD
                if (this.activeRole === 'user') {
                  this.router.navigateByUrl('/home');
                }

                // ADMIN DASHBOARD
                else if (this.activeRole === 'admin') {
                  this.router.navigateByUrl('/admin-home');
                }

              }
            }
          ]
        });

        await alert.present();

      },

      error: async (error) => {

        // CLEAR INPUT FIELDS
        this.email = '';
        this.password = '';

        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: error.error?.detail ||
                   'Invalid email or password.',
          buttons: ['OK']
        });

        await alert.present();

      }

    });

  }

  // GO TO SIGN UP PAGE
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

}
