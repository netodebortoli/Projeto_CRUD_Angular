import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Cursos } from '../model/cursos';
import { CursosService } from '../services/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver implements Resolve<Cursos> {

  constructor(private cursoServico: CursosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cursos> {
    if (route.params && route.params['id']) {
      this.cursoServico.buscarCursoPorID(route.params['id']);
    }
    return of({ _id: '', nome: '', categoria: '' });
  }
}
