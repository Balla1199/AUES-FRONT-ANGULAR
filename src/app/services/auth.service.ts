import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/backend';
const TOKEN_KEY = 'aues_token';
const USER_KEY = 'aues_utilisateur';

/**
 * Authentification auprès du backend Spring (JWT) :
 * POST /connexion {"username": <téléphone>, "password": ...} → {"bearer": "..."}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /** Le backend utilise le numéro de téléphone comme username. */
  login(telephone: string, password: string): Observable<Record<string, string>> {
    const corps = { username: telephone, password: password };
    return this.http.post<Record<string, string>>(BASE_URL + '/connexion', corps);
  }

  /** Stocke le token et le téléphone pour la session. */
  enregistrerSession(bearer: string, telephone: string): void {
    localStorage.setItem(TOKEN_KEY, bearer);
    localStorage.setItem(USER_KEY, telephone);
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get telephone(): string | null {
    return localStorage.getItem(USER_KEY);
  }

  estConnecte(): boolean {
    return this.token !== null;
  }

  seDeconnecter(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
