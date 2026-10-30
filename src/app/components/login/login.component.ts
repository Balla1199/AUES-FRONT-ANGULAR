import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  loginForm: FormGroup;
  erreur = '';
  enCours = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      telephone: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.service.estConnecte()) {
      this.router.navigate(['/dashboard']);
    }
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.erreur = 'Veuillez renseigner votre numéro et votre mot de passe.';
      return;
    }
    this.enCours = true;
    this.erreur = '';
    this.service.login(this.loginForm.value.telephone, this.loginForm.value.password).subscribe({
      next: (reponse) => {
        // /connexion renvoie {"bearer": "..."} — désérialisé en objet simple.
        const bearer = (reponse as any)?.bearer;
        if (bearer) {
          this.service.enregistrerSession(bearer, this.loginForm.value.telephone);
          this.router.navigate(['/dashboard']);
        } else {
          this.enCours = false;
          this.erreur = 'Réponse inattendue du serveur.';
        }
      },
      error: () => {
        this.enCours = false;
        this.erreur = 'Numéro ou mot de passe incorrect.';
      },
    });
  }
}
