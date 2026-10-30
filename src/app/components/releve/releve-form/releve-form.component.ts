import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReleveService } from '../../../services/releve.service';
import { CompteurService } from '../../../services/compteur.service';
import { CompteurOption } from '../../../models/releve';

@Component({
  selector: 'app-releve-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './releve-form.component.html',
  styleUrl: './releve-form.component.css',
})
export class ReleveFormComponent implements OnInit {
  releveForm: FormGroup;
  compteurs: CompteurOption[] = [];
  erreurs: string[] = [];
  succes = '';

  constructor(
    private releveService: ReleveService,
    private compteurService: CompteurService,
    private fb: FormBuilder
  ) {
    this.releveForm = this.fb.group({
      numero_compteur: ['', Validators.required],
      valLorsRelev: ['', [Validators.required, Validators.min(0)]],
      tarif: [250.5, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.compteurService.toutes().subscribe({
      next: (compteurs) =>
        (this.compteurs = compteurs.map((c) => ({
          id: c.id,
          code: c.code,
          valeur: c.CpteurChiffre ?? c.cpteurChiffre ?? 0,
        }))),
      error: () => this.erreurs.push('Impossible de charger les compteurs.'),
    });
  }

  enregistrer(): void {
    this.erreurs = [];
    this.succes = '';
    if (this.releveForm.invalid) {
      this.erreurs.push('Veuillez renseigner le compteur, la valeur relevée et le tarif.');
      return;
    }
    const valeur = this.releveForm.value;
    const compteur = this.compteurs.find((c) => c.code === valeur.numero_compteur);
    if (compteur && valeur.valLorsRelev <= compteur.valeur) {
      this.erreurs.push(
        'La valeur relevée doit être supérieure à la valeur actuelle du compteur (' +
          compteur.valeur + ').'
      );
      return;
    }
    this.releveService
      .ajouter({
        numero_compteur: valeur.numero_compteur,
        valLorsRelev: Number(valeur.valLorsRelev),
        tarif: Number(valeur.tarif),
      })
      .subscribe({
        next: () => {
          this.succes =
            'Relevé ajouté avec succès. La facture correspondante a été générée automatiquement.';
          this.releveForm.reset({
            numero_compteur: '',
            valLorsRelev: '',
            tarif: 250.5,
          });
          this.chargerCompteurs();
        },
        error: (err) => {
          const message =
            typeof err.error === 'string' ? err.error.replace(/^Erreur : /, '') : null;
          this.erreurs.push(message || "Erreur du serveur lors de l'ajout du relevé.");
        },
      });
  }

  private chargerCompteurs(): void {
    this.compteurService.toutes().subscribe({
      next: (compteurs) =>
        (this.compteurs = compteurs.map((c) => ({
          id: c.id,
          code: c.code,
          valeur: c.CpteurChiffre ?? c.cpteurChiffre ?? 0,
        }))),
    });
  }
}
