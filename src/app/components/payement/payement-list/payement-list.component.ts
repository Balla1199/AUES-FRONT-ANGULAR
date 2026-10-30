import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PayementService } from '../../../services/payement.service';
import { Payement } from '../../../models/payement';

@Component({
  selector: 'app-payement-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payement-list.component.html',
  styleUrl: './payement-list.component.css',
})
export class PayementListComponent implements OnInit {
  payements: Payement[] = [];
  erreur = '';
  succes = '';

  constructor(private service: PayementService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.service.toutes().subscribe({
      next: (payements) => (this.payements = payements),
      error: () => (this.erreur = 'Impossible de charger les paiements.'),
    });
  }

  annuler(payement: Payement): void {
    if (payement.statutPay !== 'Effectuer') return;
    this.succes = '';
    this.erreur = '';
    this.service.annuler(payement.id).subscribe({
      next: () => {
        this.succes = 'Paiement ' + payement.id + ' annulé (trace conservée).';
        this.charger();
      },
      error: () => (this.erreur = "Impossible d'annuler ce paiement."),
    });
  }
}
