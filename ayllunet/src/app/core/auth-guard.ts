import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../shared/data-access/auth-state.service'; // Asegúrate de que esta ruta sea correcta
import { map } from 'rxjs';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        console.log(state);
        if (!state) {
          router.navigateByUrl('/auth/sign-in');
          return false;
        }

        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        if (state) {
          router.navigateByUrl('/tasks');
          return false;
        }

        return true;
      })
    );
  };
};

export const emailVerificationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthStateService); // Asegúrate de que el servicio sea correcto

  return authState.authState$.pipe(
    map((state) => {
      if (state?.emailVerified === false) {
        router.navigateByUrl('/verify-email');
        return false;
      }
      return true;
    })
  );
};
