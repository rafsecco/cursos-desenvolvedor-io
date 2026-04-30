import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject, signal } from '@angular/core';

const user = signal({
  admin: true,
  logged: true
});

// 🔥 substitui CanLoad
export const adminGuard: CanMatchFn = () => {
  return user().admin;
};

// 🔥 substitui CanActivate
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!user().logged) {
    return router.createUrlTree(['/home']);
  }

  return true;
};

// import { Injectable } from '@angular/core';
// import { CanLoad, CanActivate } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanLoad, CanActivate {

//     user = { admin: true, logged: false }

//     canLoad() : boolean {
//         return this.user.admin;
//     }

//     canActivate() : boolean {
//         return this.user.logged;
//     }

// }
