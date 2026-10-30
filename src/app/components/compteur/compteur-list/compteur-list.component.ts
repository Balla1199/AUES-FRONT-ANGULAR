import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompteurService } from '../../../services/compteur.service';
import { Compteur } from '../../../models/compteur';

@Component({
  selector: 'app-compteur-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './compteur-list.component.html',
  styleUrl: './compteur-list.component.css',
})
export class CompteurListComponent implements OnInit {
  compteurs: Compteur[] = [];
  erreur = '';

  constructor(private service: CompteurService) {}

  ngOnInit(): void {
    this.service.toutes().subscribe({
      next: (compteurs) => (this.compteurs = compteurs),
      error: () => (this.erreur = 'Impossible de charger les compteurs.'),
    });
  }

  valeurActuelle(compteur: Compteur): number {
    return compteur.CpteurChiffre ?? compteur.cpteurChiffre ?? 0;
  }
}
