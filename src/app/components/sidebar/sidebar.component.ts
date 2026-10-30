import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  seDeconnecter(): void {
    this.auth.seDeconnecter();
    this.router.navigate(['/login']);
  }
}
