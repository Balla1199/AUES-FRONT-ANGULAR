import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './utilisateur-form.component.html',
  styleUrl: './utilisateur-form.component.css',
})
export class UtilisateurFormComponent {
  utilisateurForm: FormGroup;
  erreurs = '';
  succes = '';

  constructor(private service: UtilisateurService, private fb: FormBuilder) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT', Validators.required],
    });
  }

  enregistrer(): void {
    this.erreurs = '';
    this.succes = '';
    if (this.utilisateurForm.invalid) {
      this.erreurs = 'Veuillez renseigner tous les champs (mot de passe : 6 caractères minimum).';
      return;
    }
    this.service.inscrire(this.utilisateurForm.value).subscribe({
      next: (reponse) => {
        this.succes = typeof reponse === 'string' ? reponse : 'Utilisateur inscrit avec succès.';
        this.utilisateurForm.reset({ nom: '', adresse: '', telephone: '', password: '', role: 'CLIENT' });
      },
      error: (err) => {
        this.erreurs =
          typeof err.error === 'string'
            ? err.error
            : 'Erreur du serveur (inscription réservée aux administrateurs).';
      },
    });
  }
}
