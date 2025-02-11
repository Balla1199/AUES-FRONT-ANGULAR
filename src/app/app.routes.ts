import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importation des composants
import { UtilisateurFormComponent } from './components/utilisateur/utilisateur-form/utilisateur-form.component';
import { UtilisateurListComponent } from './components/utilisateur/utilisateur-list/utilisateur-list.component';
import { CompteurFormComponent } from './components/compteur/compteur-form/compteur-form.component';
import { CompteurListComponent } from './components/compteur/compteur-list/compteur-list.component';
import { PayementFormComponent } from './components/payement/payement-form/payement-form.component';
import { PayementListComponent } from './components/payement/payement-list/payement-list.component';
import { FactureListComponent } from './components/facture/facture-list/facture-list.component';
import { ReleveFormComponent } from './components/releve/releve-form/releve-form.component';
import { ReleveListComponent } from './components/releve/releve-list/releve-list.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'utilisateur/add', component: UtilisateurFormComponent },
  { path: 'utilisateur/list', component: UtilisateurListComponent },
  { path: 'compteur/add', component: CompteurFormComponent },
  { path: 'compteur/list', component: CompteurListComponent },
  { path: 'payement/add', component: PayementFormComponent },
  { path: 'payement/list', component: PayementListComponent },
  { path: 'facture/list', component: FactureListComponent },
  { path: 'releve/add', component: ReleveFormComponent },
  { path: 'releve/list', component: ReleveListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Page par défaut : Login
  { path: '**', redirectTo: 'login' } // Redirection pour les routes non trouvées
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
