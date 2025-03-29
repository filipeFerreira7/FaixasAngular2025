import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router,RouterModule} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Estado } from '../../../models/estado.model';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [ NgIf, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule,RouterModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})

export class EstadoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

      const estado: Estado = this.activatedRoute.snapshot.data['estado'];
      this.formGroup = this.formBuilder.group({
        id: [(estado && estado.id) ? estado.id : null],
        nome: [(estado && estado.nome) ? estado.nome:'', Validators.compose([Validators.required,Validators.maxLength(60)])],
        sigla: [(estado && estado.sigla) ? estado.sigla: '',Validators.compose([Validators.required,Validators.maxLength(2)])]
      })
    }

    salvar(){
      this.formGroup.markAllAsTouched();
      if( this.formGroup.valid){
        const estado = this.formGroup.value;

        const operacao = estado.id == null
        ? this.estadoService.salvar(estado)
        : this.estadoService.update(estado);

        operacao.subscribe({
        next: () => {
            this.router.navigateByUrl('/estados');
          },
          error: (errorResponse) => {
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
            this.tratarErros(errorResponse);
          }
        })
  
       
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