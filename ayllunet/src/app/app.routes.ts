import { Routes } from '@angular/router';
import { privateGuard, publicGuard, emailVerificationGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },

  // Ruta para las tareas, usando el componente LayoutComponent standalone
  {
    canActivateChild: [privateGuard(), emailVerificationGuard],  // Sin paréntesis en la guardia
    path: 'tasks',
    loadChildren: () => import('./task/features/task.routes'),
  },

  {
    path: '**',
    redirectTo: '/tasks',
  }
];