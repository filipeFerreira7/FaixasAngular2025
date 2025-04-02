import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink,Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cidade-list',
  imports: [NgFor,RouterLink,MatIconModule,MatToolbarModule,MatButtonModule,MatTableModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'estado','acao'];
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe(data => {
      this.cidades = data;
    });
  }

  excluir(cidade: Cidade): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cidadeService.delete(cidade).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/cidades/']); // Navega de volta para a lista
            });
          },
          error: (err) => {
            console.error('Erro ao tentar excluir cidade', err);
          }
        });
      }
    });
  }
  
}
