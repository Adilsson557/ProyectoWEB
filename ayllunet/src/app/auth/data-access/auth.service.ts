import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  // Método para crear usuario y enviar correo de verificación
  async signUp(user: User) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );

      // Enviar correo de verificación al usuario
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    } catch (error) {
      throw new Error('Error al crear el usuario.');
    }
  }

  // Método de inicio de sesión
  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  // Método para recuperar la contraseña
  recoverPassword(user: User) {
    return sendPasswordResetEmail(this._auth, user.email);
  }

  // Método para recargar el estado del usuario
  async reloadUser(): Promise<void> {
    const user = this._auth.currentUser;
    if (user) {
      await user.reload();
    }
  }

  // Getter para verificar si el correo electrónico está verificado
  get isEmailVerified$(): boolean {
    return this._auth.currentUser?.emailVerified ?? false;
  }
}
