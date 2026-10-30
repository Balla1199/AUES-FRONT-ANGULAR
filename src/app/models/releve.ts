/** Relevé renvoyé par GET /releves (entité brute). */
export interface Releve {
  id: number;
  date: string;
  unite_consomme: number;
  valLorsRelev: number;
  tarif: number;
  /** Numéro du compteur : exposé par l'entité Facture, pas toujours par Releve. */
  numero_compteur?: string;
}

export interface CompteurOption {
  id: number;
  code: string;
  /** Valeur actuelle du compteur : base pour la prochaine relevé. */
  valeur: number;
}
