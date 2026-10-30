import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReleveService } from '../../../services/releve.service';
import { Releve } from '../../../models/releve';

@Component({
  selector: 'app-releve-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './releve-list.component.html',
  styleUrl: './releve-list.component.css',
})
export class ReleveListComponent implements OnInit {
  releves: Releve[] = [];
  erreur = '';

  constructor(private service: ReleveService) {}

  ngOnInit(): void {
    this.service.toutes().subscribe({
      next: (releves) => (this.releves = releves),
      error: () => (this.erreur = 'Impossible de charger les relevés.'),
    });
  }
}
