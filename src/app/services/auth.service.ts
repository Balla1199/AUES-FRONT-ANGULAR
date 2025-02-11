import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const BASE_URL= "http://localhost:8080/connexion"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private router: Router
  ) {}

  login(loginRequest: any): Observable<any>{
    return this.http.post(BASE_URL, loginRequest)
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Renvoie true si un token est présent
  }
  logout() {
    localStorage.removeItem('jwt'); // Supprime le token JWT
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
  // private apiUrl = 'http://localhost:8080/connexion';

  // constructor(private http: HttpClient) {}

  // login(telephone: string, password: string): Observable<any> {
  //   return this.http.post(this.apiUrl, { telephone, password });
  // }
}
