import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CidadeService } from '../../../services/cidade.service';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Cidade } from '../../../models/cidade.model';
import { Estado } from '../../../models/estado.model';

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [
    NgIf, NgFor, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, MatOptionModule
  ],
  templateUrl: './cidade-form.component.html',
  styleUrl: './cidade-form.component.css'
})
export class CidadeFormComponent implements OnInit {
  formGroup!: FormGroup;
  estados: Estado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null, Validators.required] // Estado será um objeto selecionado
    });

    // Carregar estados do banco de dados
    this.estadoService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (err) => {
        console.error('Erro ao carregar estados:', err);
      }
    });

    // Se for edição, carregar cidade existente
    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];
    if (cidade) {
      this.formGroup.patchValue(cidade);
    }
  }

  salvar(): void {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (!cidade.id) {
        this.cidadeService.salvar(cidade).subscribe({
          next: () => this.router.navigateByUrl('/cidades'),
          error: (errorResponse) => console.error('Erro ao incluir', errorResponse)
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: () => this.router.navigateByUrl('/cidades'),
          error: (err) => console.error('Erro ao atualizar', err)
        });
      }
    }
  }

  excluir(): void {
    if (this.formGroup.valid && this.formGroup.value.id) {
      this.cidadeService.delete(this.formGroup.value).subscribe({
        next: () => this.router.navigateByUrl('/cidades'),
        error: (err) => console.error('Erro ao excluir', err)
      });
    }
  }
}
