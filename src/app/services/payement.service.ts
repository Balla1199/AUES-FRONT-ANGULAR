import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Payement } from '../models/payement';

const BASE_URL = '/backend';

/** Paiements (chemins de l'équipe : /payement/… et /payment/searchs). */
@Injectable({ providedIn: 'root' })
export class PayementService {
  constructor(private http: HttpClient) {}

  /** Chemin historique de l'équipe (conservé tel quel). */
  toutes(): Observable<Payement[]> {
    return this.http.get<Payement[]>(BASE_URL + '/payment/searchs');
  }

  /** POST /payement/save {montant, mode, idFact, payeur?} */
  enregistrer(dto: { montant: number; mode: string; idFact: number; payeur?: string }): Observable<Payement> {
    return this.http.post<Payement>(BASE_URL + '/payement/save', dto);
  }

  annuler(id: number): Observable<Payement> {
    return this.http.get<Payement>(BASE_URL + '/payement/annuler/' + id);
  }
}
