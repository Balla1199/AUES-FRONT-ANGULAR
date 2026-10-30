import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Releve } from '../models/releve';

const BASE_URL = '/backend';

/** Relevés de compteurs (endpoints de l'équipe : /releves). */
@Injectable({ providedIn: 'root' })
export class ReleveService {
  constructor(private http: HttpClient) {}

  toutes(): Observable<Releve[]> {
    return this.http.get<Releve[]>(BASE_URL + '/releves');
  }

  /** POST /releves {numero_compteur, valLorsRelev, tarif} — facture auto-générée. */
  ajouter(dto: { numero_compteur: string; valLorsRelev: number; tarif: number }): Observable<string> {
    return this.http.post<string>(BASE_URL + '/releves', dto);
  }
}
