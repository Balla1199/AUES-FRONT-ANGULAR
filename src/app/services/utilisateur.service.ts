import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Utilisateur, UtilisateurInscription } from '../models/utilisateur';

const BASE_URL = '/backend';

/** Utilisateurs (endpoints de l'équipe : /afficher, /inscrire). */
@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  /** GET /afficher — note : ce endpoint n'est PAS préfixé par /utilisateur. */
  tous(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(BASE_URL + '/afficher');
  }

  /** POST /inscrire (réservé aux administrateurs côté backend). */
  inscrire(dto: UtilisateurInscription): Observable<string> {
    return this.http.post<string>(BASE_URL + '/inscrire', dto);
  }
}
