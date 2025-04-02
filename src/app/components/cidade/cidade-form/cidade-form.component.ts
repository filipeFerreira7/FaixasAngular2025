import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component'

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
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null, Validators.required]
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
      const cidade = {
        ...this.formGroup.value, // Espalha os valores do formulário corretamente
        idEstado: this.formGroup.value.estado?.id // Pegando apenas o ID do estado
      };
      delete cidade.estado; // Removendo o objeto estado, se necessário
  
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


  tratarErros(httpError: HttpErrorResponse):void{

    if(httpError.status === 400) {
      if(httpError.error?.errors){
        httpError.error.errors.forEach((validationError: any) => {
            const formControl = this.formGroup.get(validationError.fieldName);
            if(formControl){
              formControl.setErrors({apiError: validationError.message});
            }
          });
      };
    }else{
      alert(httpError.error?.message || "Erro não mapeado do servidor. ");
    }
} 

getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
  if(!errors || !this.errorMessages[controlName]){
    return 'invalid field';
  }

  for(const errorName in errors){
    if(this.errorMessages[controlName][errorName]){
      return this.errorMessages[controlName][errorName];
    }
  }
  return 'invalid field';
}
// é proximo ao map do java 
errorMessages: {[controlName: string] : {[errorName: string]: string}} = {
  nome: {
    required: 'O nome deve ser informado. ',
    minlength: 'O nome deve ter no mínimo 2 caracteres. ',
    maxLength: 'O nome deve ter no máximo 60 caracteres',
    apiError: ' '
  },
  sigla: {
    required: 'A sigla deve ser informada. ',
    minlength: 'A sigla deve ter no mínimo 2 caracteres. ',
    maxlength: 'A sigla deve ter no máximo 2 caracteres',
    apiError: ' '
  },

}
}
