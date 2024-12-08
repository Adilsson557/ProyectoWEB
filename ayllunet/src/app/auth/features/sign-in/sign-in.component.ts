import { Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', Validators.required),
  });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;

      await this._authService.signIn({ email, password });
      await this._authService.reloadUser();

      if (this._authService.isEmailVerified$) {
        toast.success('Hola nuevamente');
        this._router.navigateByUrl('/tasks');
      } else {
        toast.info('Verifica tu correo para continuar');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      toast.error('Ups, ocurrió un error');
    }
  }

  async submitWithGoogle() {
    try {
      
      await this._authService.reloadUser();

      if (this._authService.isEmailVerified$) {
        toast.success('Bienvenido de nuevo');
        this._router.navigateByUrl('/tasks');
      } else {
        toast.info('Verifica tu correo para continuar');
      }
    } catch (error) {
      console.error('Error en el inicio con Google:', error);
      toast.error('Ups, ocurrió un error');
    }
  }
}