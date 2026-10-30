import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PayementService } from '../../../services/payement.service';
import { FactureService } from '../../../services/facture.service';
import { Payement } from '../../../models/payement';
import { Facture, MODES_PAIEMENT } from '../../../models/facture';

@Component({
  selector: 'app-payement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payement-form.component.html',
  styleUrl: './payement-form.component.css',
})
export class PayementFormComponent implements OnInit {
  payementForm: FormGroup;
  facturesImpayees: Facture[] = [];
  erreurs: string[] = [];
  succes = '';
  modes = MODES_PAIEMENT;

  constructor(
    private service: PayementService,
    private factureService: FactureService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.payementForm = this.fb.group({
      idFact: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]],
      mode: ['', Validators.required],
      payeur: [''],
    });
  }

  ngOnInit(): void {
    this.factureService.toutes().subscribe({
      next: (factures) =>
        (this.facturesImpayees = factures.filter((f) => f.statut === 'Impayee')),
      error: () => this.erreurs.push('Impossible de charger les factures.'),
    });

    // Pré-remplissage si on vient d'une facture (bouton payer de la liste).
    const cible = this.route.snapshot.queryParams['facture'];
    if (cible) {
      this.payementForm.patchValue({ idFact: String(cible) });
    }
  }

  enregistrer(): void {
    this.erreurs = [];
    if (this.payementForm.invalid) {
      this.erreurs.push('Veuillez renseigner la facture, un montant positif et le mode.');
      return;
    }
    const valeur = this.payementForm.value;
    const corps: { montant: number; mode: string; idFact: number; payeur?: string } = {
      montant: Number(valeur.montant),
      mode: valeur.mode,
      idFact: Number(valeur.idFact),
    };
    if (valeur.payeur) corps.payeur = valeur.payeur;

    this.service.enregistrer(corps).subscribe({
      next: (payement: Payement) => {
        this.succes = 'Paiement de ' + payement.montant + ' FCFA enregistré sur la facture #' + payement.idFact + '.';
        this.payementForm.reset({ idFact: '', montant: '', mode: '', payeur: '' });
      },
      error: (err) => {
        const message = typeof err.error === 'string' ? err.error : null;
        if (message) this.erreurs.push(message);
        else this.erreurs.push('Erreur du serveur : vérifiez le montant et la facture.');
      },
    });
  }
}
