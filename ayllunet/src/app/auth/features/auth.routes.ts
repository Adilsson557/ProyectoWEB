import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.component'),
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./recover-password/recover-password.component'),
  },
] as Routes;