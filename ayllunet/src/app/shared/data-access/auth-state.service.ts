import { inject, Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);

  // Observable para el estado de autenticación
  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  // Getter para el usuario actual
  get currentUser() {
    return this._auth.currentUser; // Uso directo de la instancia inyectada
  }

  // Método para cerrar sesión
  logOut() {
    return signOut(this._auth);
  }
}
