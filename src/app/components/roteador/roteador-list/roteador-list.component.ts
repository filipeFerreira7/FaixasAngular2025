import { Component, OnInit } from '@angular/core';
import { Roteador } from '../../../models/roteador.model';
import { RoteadorService } from '../../../services/roteador.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-roteador-list',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink, MatTableModule, RouterModule],
  templateUrl: './roteador-list.component.html',
  styleUrl: './roteador-list.component.css'
})

export class RoteadorListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'acao'];
  // datasorce, preenchido quando carrega a instância
  roteadores: Roteador[] = [];

  constructor(private roteadorService: RoteadorService) {}

  ngOnInit(): void {
    this.roteadorService.findAll().subscribe(data => {
      this.roteadores = data;
    });
  }
  
}
