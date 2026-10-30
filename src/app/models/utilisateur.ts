/** Utilisateur renvoyé par GET /afficher (entité brutes, UserDetails inclus). */
export interface Utilisateur {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
  /** Rôle : 'ADMINISTRATEUR' | 'CLIENT' */
  role: string;
}

/** Corps de POST /inscrire (champs de UtilisateurDTO). */
export interface UtilisateurInscription {
  nom: string;
  adresse: string;
  telephone: string;
  password: string;
  role: string;
}
