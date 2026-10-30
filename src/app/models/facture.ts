/** Facture renvoyée par GET /facture/ (FactureDto du backend). */
export interface Facture {
  id: number;
  numero: string;
  dateTrs: string;
  /** yyyy-MM-dd */
  dateEcheance: string;
  /** 'Payee' | 'Impayee' */
  statut: string;
  montant: number;
  montantPaye: number;
  numeroCompteur: string;
}

export const MODES_PAIEMENT = ['Especes', 'MobileMoney', 'Virement', 'Cheque'] as const;
export const STATUTS_FACTURE = ['Payee', 'Impayee'] as const;
