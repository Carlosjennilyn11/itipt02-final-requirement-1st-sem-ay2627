
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  MenuController,
  AlertController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  person,
  lockClosed,
  logIn,
  businessOutline,
  mail
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ],
})
export class SignupPage implements OnInit {

  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {

    addIcons({
      person,
      lockClosed,
      logIn,
      businessOutline,
      mail
    });

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main-menu');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, 'main-menu');
  }

  ngOnInit() {}

  async register() {

    // CHECK EMPTY FIELDS
    if (
      !this.first_name ||
      !this.last_name ||
      !this.username ||
      !this.email ||
      !this.password ||
      !this.confirm_password
    ) {

      const alert = await this.alertController.create({
        header: 'Incomplete Information',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // CHECK PASSWORD
    if (this.password !== this.confirm_password) {

      const alert = await this.alertController.create({
        header: 'Password Error',
        message: 'Passwords do not match.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // REGISTRATION DATA
    const userData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // CONNECT TO FASTAPI
    this.authService.register(userData).subscribe({

      next: async (response) => {

        const alert = await this.alertController.create({
          header: 'Registration Successful',
          message: 'Your account has been created successfully. Please log in using your new account.',
          buttons: [
            {
              text: 'OK',
              handler: () => {

                // CLEAR SIGN UP FIELDS
                this.first_name = '';
                this.last_name = '';
                this.username = '';
                this.email = '';
                this.password = '';
                this.confirm_password = '';

                // RETURN TO MAIN LOGIN
                this.router.navigateByUrl('/main');

              }
            }
          ]
        });

        await alert.present();

      },

      error: async (error) => {

        const alert = await this.alertController.create({
          header: 'Registration Failed',
          message: error.error?.detail ||
                   'Unable to create account. Please try again.',
          buttons: ['OK']
        });

        await alert.present();

      }

    });

  }

  // BACK TO MAIN LOGIN
  backToLogin() {
    this.router.navigateByUrl('/main');
  }

}
