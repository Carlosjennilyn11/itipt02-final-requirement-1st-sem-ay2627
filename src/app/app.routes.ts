import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'rooms',
    loadComponent: () => import('./pages/rooms/rooms.page').then((m) => m.RoomsPage),
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./pages/my-bookings/my-bookings.page').then((m) => m.MyBookingsPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./app/signup/signup.page').then((m) => m.SignupPage),
  },
];
