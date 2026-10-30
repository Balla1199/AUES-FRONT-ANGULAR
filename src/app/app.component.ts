import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'aues';
  surLogin = true;

  constructor(private router: Router, private auth: AuthService) {
    this.suivreRoute();
  }

  /** La sidebar et la navbar ne s'affichent que pour les pages internes. */
  private suivreRoute(): void {
    const maj = () => {
      this.surLogin = this.router.url === '/login' || !this.auth.estConnecte();
    };
    // Premier routage + suivi des navigations suivantes.
    maj();
    this.router.events
      .pipe(filter((evenement) => evenement instanceof NavigationEnd))
      .subscribe(maj);
  }
}
