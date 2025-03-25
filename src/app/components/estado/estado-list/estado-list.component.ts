import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startWith,map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable,of } from 'rxjs';
@Component({
  selector: 'app-estado-list',
  imports: [NgFor,RouterLink,MatIconModule,MatToolbarModule,MatButtonModule,MatTableModule,MatPaginatorModule,
    AsyncPipe,FormsModule,ReactiveFormsModule,MatAutocompleteModule
  ],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  control = new FormControl('');
  displayedColumns: string[] = ['id', 'nome', 'sigla','acao'];
  estadosOriginais: Estado[] = []; // Lista completa dos estados
  estadosFiltrados: Estado[] = []; // Estados exibidos na tabela


  //variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 30;
    page = 0;

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    // Buscar todos os estados do banco de dados
    this.estadoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.estadosOriginais = data || []; // Mantém os estados completos
      this.estadosFiltrados = [...this.estadosOriginais]; // Inicialmente, mostra todos
    });

    // Verifica o total de registros
    this.estadoService.count().subscribe(data => {
      this.totalRecords = data;
    });

    // Observa mudanças no input de busca
    this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    ).subscribe(filtered => {
      this.estadosFiltrados = filtered;
    });
  }

  // Função de filtro
  private _filter(value: string): Estado[] {
    const filterValue = this._normalizeValue(value);
    return this.estadosOriginais.filter(estado =>
      this._normalizeValue(estado.nome).includes(filterValue)
    );
  }

  // Função de paginação
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit(); // Recarrega os dados ao mudar a página
  }

 // Função para normalizar o valor de busca, removendo acentos e espaços extras
 private _normalizeValue(value: string): string {
  return value
    .normalize("NFD") // Separa acentos dos caracteres
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .toLowerCase() // Converte para minúsculas
    .trim(); // Remove espaços extras
}

}