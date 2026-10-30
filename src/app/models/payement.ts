/** Paiement renvoyé par GET /payment/searchs (PayementDto du backend). */
export interface Payement {
  id: number;
  date: string;
  montant: number;
  /** 'Especes' | 'MobileMoney' | 'Virement' | 'Cheque' */
  mode: string;
  /** 'Effectuer' | 'Annule' */
  statutPay: string;
  idFact: number;
  payeur: string | null;
}
