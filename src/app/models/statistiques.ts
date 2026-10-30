/** Bloc renvoyé par GET /statistiques (StatistiqueService). */
export interface Statistiques {
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
