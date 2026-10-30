import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css',
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  erreur = '';

  constructor(private service: UtilisateurService) {}

  ngOnInit(): void {
    this.service.tous().subscribe({
      next: (utilisateurs) => (this.utilisateurs = utilisateurs),
      error: () => (this.erreur = 'Impossible de charger les utilisateurs.'),
    });
  }
}
