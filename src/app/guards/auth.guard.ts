import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const canActivate = localStorage.getItem('usuarioActual') !== null;

    if (!canActivate) {
      setTimeout(() => {
        this.router.navigate(['/e404']); 
        setTimeout(() => {
          this.router.navigate(['/tabs/tab1']); 
        }, 2000);
      }, 0);
    }

    return canActivate;
  }
}
