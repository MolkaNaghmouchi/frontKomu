import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';




@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private token: string;
  private expirationDate: Date;
  
  
  constructor() { this.token = this.getToken();
    if (this.token) {
      const decodedToken: any = jwt_decode(this.token);
      console.log('Decoded Token:', decodedToken);
      this.expirationDate = new Date(decodedToken.exp * 1000);
    }
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }





  logout(): void {
    // Clear the token from localStorage or perform any other necessary logout tasks
    window.sessionStorage.removeItem(TOKEN_KEY);
  }



  public isTokenExpired(): boolean {
    if (this.token && new Date() < this.expirationDate) {
      return false;
    }
    return true;
  }
}