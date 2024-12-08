import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';


interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  // Validación para el correo institucional
  unajmaEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value || '';
    const domain = '@unajma.edu.pe';
    return email.endsWith(domain) ? null : { unajmaEmail: true }; 
  }

  // Comprobación de errores
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  hasDomainError() {
    const emailControl = this.form.get('email');
    return emailControl?.hasError('unajmaEmail') && emailControl?.touched;
  }

  // Formulario reactivo
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required, 
      Validators.email,
      this.unajmaEmailValidator, 
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) {
      if (this.hasDomainError()) {
        toast.error('Por favor, usa el correo institucional (@unajma.edu.pe).');
      }
      return;
    }

    try {
      const { email, password } = this.form.value;

      if (!email || !password) return;

      // Crear usuario y enviar correo de verificación
      await this._authService.signUp({ email, password });

      toast.success('Usuario creado correctamente. Por favor, revisa tu correo para verificar tu cuenta.');

      // Redirigir a la página de inicio de sesión
      this._router.navigateByUrl('/sign-in');
    } catch (error) {
      toast.error('Upss Ocurrió un error');
    }
  }

  // Google Sign In
  async submitWithGoogle() {
    try {
    
      toast.success('Bienvenido de nuevo');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Upss Ocurrió un error');
    }
  }
}