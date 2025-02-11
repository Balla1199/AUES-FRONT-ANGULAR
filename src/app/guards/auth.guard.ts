// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
    
//     const token = localStorage.getItem('jwt');

//     if (!token) {
//       console.warn("🔴 Accès refusé : Aucun token trouvé !");
//       this.router.navigate(['/login']);
//       return false;
//     }

//     console.log("🟢 Accès autorisé au Dashboard");
//     return true;
//   }
  
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt');

    if (!token || !this.isValidToken(token)) {
      console.warn("🔴 Accès refusé !");
      this.router.navigate(['/login']);
      return false;
    }

    console.log("🟢 Accès autorisé au Dashboard");
    return true;
  }

  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload && payload.exp * 1000 > Date.now(); // Vérifier l'expiration du token
    } catch (error) {
      return false;
    }
  }
}

