import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenStorage.getToken()) {
      return true; // L'utilisateur est authentifié
    } else {
      this.router.navigate(['/login']); // Redirection vers la page de connexion
      return false;
    }
  }
}
