import { Component } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';


@Component({
  selector: 'app-logout-button',
  template: `
    <button 
      (click)="logOut()" 
      class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
      Cerrar Sesión
    </button>
  `,
  standalone: true,  // Asegúrate de que esté en modo standalone si es necesario
  providers: [AuthStateService],  // Asegúrate de que el servicio esté aquí
})
export class LogoutButtonComponent {
  constructor(private authStateService: AuthStateService) {}

  logOut() {
    this.authStateService.logOut().then(() => {
      // Aquí puedes agregar redirección o alguna lógica tras cerrar sesión
      console.log('Sesión cerrada');
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  }
}
