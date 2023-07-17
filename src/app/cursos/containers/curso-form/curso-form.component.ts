import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Aulas } from '../../model/aulas';
import { Cursos } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  // Declaração da váriavel de formulário com uso de !
  // Isso permite nao inicializar a variavel no momento da sua declaração
  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private servico: CursosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    const curso: Cursos = this.router.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      _id: [curso._id],
      nome: [curso.nome,
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      categoria: [curso.categoria,
      [Validators.required]],
      aulas: this.formBuilder.array(this.obterAulas(curso))
    });
  }

  onSubmit() {
    this.servico.saveCurso(this.form.value).subscribe({
      next: () => this.onSucess(),
      error: () => {
        this.onError();
      }
    })
  }

  private obterAulas(curso: Cursos) {
    const aulas = [];
    if (curso?.aulas) {
      curso.aulas.forEach(
        aula => aulas.push(this.criarAula(aula))
      );
    } else {
      aulas.push(this.criarAula());
    }
    return aulas;
  }

  private criarAula(aula: Aulas = { id: '', nome: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [aula.id],
      nome: [aula.nome],
      youtubeUrl: [aula.youtubeUrl]
    });
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

  getAulasFormArray() {
    return (<UntypedFormArray>this.form.get('aulas')).controls;
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
