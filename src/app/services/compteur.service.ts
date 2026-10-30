import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Compteur } from '../models/compteur';

const BASE_URL = '/backend';

/** Compteurs (endpoints de l'équipe : /compteur). */
@Injectable({ providedIn: 'root' })
export class CompteurService {
  constructor(private http: HttpClient) {}

  toutes(): Observable<Compteur[]> {
    return this.http.get<Compteur[]>(BASE_URL + '/compteur');
  }

  /** POST /compteur {code, cpteurChiffre, statut} */
  ajouter(dto: { code: string; cpteurChiffre: number; statut: string }): Observable<string> {
    return this.http.post<string>(BASE_URL + '/compteur', dto);
  }
}
