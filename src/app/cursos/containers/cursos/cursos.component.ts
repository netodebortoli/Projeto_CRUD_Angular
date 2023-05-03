import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Cursos } from '../../model/cursos';
import { CursosService } from '../../services/cursos.service';
import { ComponenteConfirmacaoComponent } from 'src/app/shared/components/componente-confirmacao/componente-confirmacao.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursos$: Observable<Cursos[]> | null = null

  constructor(
    private cursoServico: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.carregarDadosPagina();
  }

  carregarDadosPagina() {
    this.cursos$ = this.cursoServico.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar os cursos.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(curso: Cursos) {
    this.router.navigate(['editar', curso._id], { relativeTo: this.route });
  }

  onDelete(curso: Cursos) {

    const dialogRef = this.dialog.open(ComponenteConfirmacaoComponent, {
      data: 'Deseja realmente remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cursoServico.removerCursoPorID(curso._id).subscribe(
          () => {
            this.carregarDadosPagina();
            this.snackBar.open('Curso removido com sucesso!', 'OK', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => {
            this.onError('Erro ao tentar remover o curso.')
          }
        );
      }
    });
  }
}
