import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';

/** Ajoute le token JWT (champ "bearer" de /connexion) à chaque requête. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    if (token && !req.url.includes('/connexion')) {
      const requete = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
      return next.handle(requete);
    }
    return next.handle(req);
  }
}
