import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../data-access/task.service';

import { Router } from '@angular/router'; // Importar Router para redirección
import { AuthStateService } from '../../../shared/data-access/auth-state.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  providers: [TaskService],
})
export default class TaskListComponent implements OnInit {
  tasksService = inject(TaskService);
  authStateService = inject(AuthStateService);
  router = inject(Router);

  profile = {
    firstName: '',
    lastName: '',
    career: '',
    photo: null as File | null,
  };

  ngOnInit() {
    // Verificar si el usuario está autenticado cuando el componente se carga
    this.authStateService.authState$.subscribe((user) => {
      if (!user) {
        // Si no hay usuario, redirigir a la página de login (solo cuando no hay sesión activa)
        this.router.navigate(['/login']);
      }
    });
  }

  // Método para cerrar sesión
  logOut() {
    this.authStateService.logOut().then(() => {
      console.log('Sesión cerrada');
      // Recargar la página automáticamente
      window.location.reload();
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  }

  onFileSelected(event: any) {
    this.profile.photo = event.target.files[0];
  }

  onSubmit() {
    console.log('Perfil enviado:', this.profile);
  }
}
