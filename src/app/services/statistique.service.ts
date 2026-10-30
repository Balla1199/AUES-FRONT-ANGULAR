import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/backend';

/** Endpoints statistiques du tableau de bord. */
@Injectable({ providedIn: 'root' })
export class StatistiqueService {
  constructor(private http: HttpClient) {}

  statistiques(): Observable<any> {
    return this.http.get(BASE_URL + '/statistiques');
  }
}
