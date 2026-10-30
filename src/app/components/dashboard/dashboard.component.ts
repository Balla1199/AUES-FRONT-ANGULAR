import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { StatistiqueService } from '../../services/statistique.service';

/** Bloc de stats renvoyé par GET /statistiques (numéroté sur le mockup). */
interface BlocStats {
  nbCompteurs: number;
  nbFactures: number;
  nbFacturesImpayees: number;
  recettesTotales: number;
  montantFacture: number;
  montantImpaye: number;
  tauxRecouvrement: number;
  uniteConsommees: number;
  recettesParMois: Record<string, number>;
  consommationParMois: Record<string, number>;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  stats: BlocStats | null = null;
  erreur = '';

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit(): void {
    this.statistiqueService.statistiques().subscribe({
      next: (stats: BlocStats) => (this.stats = stats),
      error: () => (this.erreur = 'Impossible de charger les statistiques.'),
    });
  }

  /** Paires [mois, montant] pour les tableaux du mockup. */
  entrees(payload: Record<string, number> | undefined): [string, number][] {
    return payload ? Object.entries(payload) : [];
  }

  enFrancs(valeur?: number): string {
    return valeur == null ? '0' : Math.round(valeur).toLocaleString('fr-FR').replace(',', ' ') + ' FCFA';
  }
}
