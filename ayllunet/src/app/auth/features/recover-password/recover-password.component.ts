import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
})
export default class RecoverPasswordComponent {

isEmailRequired() {
throw new Error('Method not implemented.');
}
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  constructor(private _router: Router) {}

goToSignIn() {
  this._router.navigate(['/auth/sign-in']);
}

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
  });

  async submit() {
    if (this.form.invalid) {
      toast.error('Por favor, ingresa un correo válido');
      return;
    }

    try {
      const { email } = this.form.value;

      if (!email) return;

      await this._authService.recoverPassword({
        email,
        password: ''
      });

      toast.success('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
      toast.error('Ocurrió un error. Verifica el correo ingresado.');
    }
  }
}
