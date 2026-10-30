import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompteurService } from '../../../services/compteur.service';

@Component({
  selector: 'app-compteur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './compteur-form.component.html',
  styleUrl: './compteur-form.component.css',
})
export class CompteurFormComponent {
  compteurForm: FormGroup;
  erreurs = '';
  succes = '';

  constructor(private service: CompteurService, private fb: FormBuilder) {
    this.compteurForm = this.fb.group({
      code: ['', Validators.required],
      cpteurChiffre: ['', [Validators.required, Validators.min(0)]],
      statut: ['Active', Validators.required],
    });
  }

  enregistrer(): void {
    this.erreurs = '';
    this.succes = '';
    if (this.compteurForm.invalid) {
      this.erreurs = 'Veuillez renseigner le numéro du compteur et sa valeur initiale.';
      return;
    }
    this.service.ajouter(this.compteurForm.value).subscribe({
      next: () => {
        this.succes = 'Le compteur a été ajouté avec succès.';
        this.compteurForm.reset({ code: '', cpteurChiffre: '', statut: 'Active' });
      },
      error: () => (this.erreurs = "Erreur du serveur : le numéro du compteur doit être unique."),
    });
  }
}
