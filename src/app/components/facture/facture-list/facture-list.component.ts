import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FactureService } from '../../../services/facture.service';
import { Facture } from '../../../models/facture';

@Component({
  selector: 'app-facture-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './facture-list.component.html',
  styleUrl: './facture-list.component.css',
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  erreur = '';
  chargement = true;

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.factureService.toutes().subscribe({
      next: (factures) => {
        this.factures = factures;
        this.chargement = false;
      },
      error: () => {
        this.erreur = 'Impossible de charger les factures.';
        this.chargement = false;
      },
    });
  }

  enFrancs(valeur?: number): string {
    return valeur == null ? '0' : Math.round(valeur).toLocaleString('fr-FR').replace(',', ' ') + ' FCFA';
  }

  reste(facture: Facture): number {
    return Math.max(0, (facture.montant ?? 0) - (facture.montantPaye ?? 0));
  }
}
