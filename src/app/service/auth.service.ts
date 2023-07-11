import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8090/api/auth/';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private tokenStorageService:TokenStorageService) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'signin',
            {
                username,
                password,
            },
            httpOptions
        );
    }

    register(
        username: string,
        email: string,
        password: string
    ): Observable<any> {
        return this.http.post(
            AUTH_API + 'signup',
            {
                username,
                email,
                password,
            },
            httpOptions
        );
    }
    isLoggedIn(): boolean {
      return !this.tokenStorageService.isTokenExpired();
    }
}
