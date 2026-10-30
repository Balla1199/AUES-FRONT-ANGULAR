/** Compteur renvoyé par GET /compteur. */
export interface Compteur {
  id: number;
  /** Numéro du compteur (colonne Numero côté base). */
  code: string;
  statut: 'Active' | 'Inactive';
  /** Valeur actuelle du compteur (colonne Tableau côté base). */
  CpteurChiffre?: number;
  cpteurChiffre?: number;
}
