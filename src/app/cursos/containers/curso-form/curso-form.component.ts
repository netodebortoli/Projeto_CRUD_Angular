import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Cursos } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    nome: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    categoria: ['',
      [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private servico: CursosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    const curso: Cursos = this.router.snapshot.data['curso'];
    this.form.setValue({
      _id: curso._id,
      nome: curso.nome,
      categoria: curso.categoria
    })
  }

  onSubmit() {
    this.servico.saveCurso(this.form.value).subscribe({
      next: (data) => this.onSucess(),
      error: () => {
        this.onError();
      }
    })
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', {
      duration: 5000
    });
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 5000
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
