import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-cidade-list',
  imports: [NgFor,RouterLink,MatIconModule,MatToolbarModule,MatButtonModule,MatTableModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'estado','acao'];
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService) {}

  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe(data => {
      this.cidades = data;
    });
  }
  
}
