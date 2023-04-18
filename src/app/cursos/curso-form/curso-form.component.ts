import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private servico: CursosService,
    private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
        nome: [null],
        categoria: [null]
    });
  }

  onSubmit() {
    this.servico.saveCurso(this.form.value).subscribe({
      next: (data) => console.log(data),
      error: () => {
        this.onError();
      }
    })
  }

  onCancel() {
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 5000
    });
  }
}
