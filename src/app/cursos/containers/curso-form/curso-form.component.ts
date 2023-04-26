import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../model/cursos';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    nome: [''],
    categoria: ['']
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
    this.snackBar.open('Curso criado com sucesso!', '', {
      duration: 5000
    });
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', {
      duration: 5000
    });
  }
}
