import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoteadorService } from '../../../services/roteador.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Roteador } from '../../../models/roteador.model';



@Component({
  selector: 'app-roteador-form',
  imports: [ RouterLink, NgIf, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule ],
  templateUrl: './roteador-form.component.html',
  styleUrl: './roteador-form.component.css'
})

export class RoteadorFormComponent {
  formGroup: FormGroup;

  // reactive form
  constructor(private formBuilder: FormBuilder,
    private roteadorService: RoteadorService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

      const roteador: Roteador = this.activatedRoute.snapshot.data['roteador'];

      this.formGroup = this.formBuilder.group({
        id: [(roteador && roteador.id) ? roteador.id : null],
        nome: [(roteador && roteador.nome) ? roteador.nome: '', Validators.required],
        descricao: [(roteador && roteador.descricao) ? roteador.descricao: '', Validators.required],
        preco: [(roteador && roteador.preco) ? roteador.preco: '', Validators.required]
      })
  }

    salvar(){
      if( this.formGroup.valid){
        const roteador = this.formGroup.value;
        if (roteador.id == null){
        this.roteadorService.insert(roteador).subscribe({
          next: (roteadorCadastrado) => {
            this.router.navigateByUrl('/roteadores');
          },
          error: (errorResponse) => {
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
        } else {
          this.roteadorService.update(roteador).subscribe({
            next: () => {
              this.router.navigateByUrl('/roteadores');
            },
            error: (errorResponse) => {
              console.log('Erro ao gravar' + JSON.stringify(errorResponse));
            }
          });
        }
      }
    }

    excluir(){
      const roteador = this.formGroup.value;
        if (roteador.id != null) {
          this.roteadorService.delete(roteador).subscribe({
            next: () => {
              this.router.navigateByUrl('/roteadores');
            },
            error: (err) => {
              console.log('Erro ao excluir' + JSON.stringify(err))
            }
          })
        }
    }
}
