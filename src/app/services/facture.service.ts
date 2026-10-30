import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Facture } from '../models/facture';

const BASE_URL = '/backend';

/** Factures (endpoints de l'équipe : /facture/…). */
@Injectable({ providedIn: 'root' })
export class FactureService {
  constructor(private http: HttpClient) {}

  toutes(): Observable<Facture[]> {
    return this.http.get<Facture[]>(BASE_URL + '/facture/');
  }

  parId(id: number): Observable<Facture> {
    return this.http.get<Facture>(BASE_URL + '/facture/search/' + id);
  }

  /** Génère une facture depuis un relevé (une seule par relevé). */
  generer(releveId: number): Observable<Facture> {
    return this.http.post<Facture>(BASE_URL + '/facture/generer/' + releveId, {});
  }
}
