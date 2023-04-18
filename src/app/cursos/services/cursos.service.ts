import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Cursos } from '../model/cursos';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'api/cursos';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cursos[]>(this.API).
    pipe(
      first(),
      delay(2000),
      tap(cursos => console.log(cursos))
    )
  }

  saveCurso(novoRegistro: Cursos) {
    return this.httpClient.post<Cursos>(this.API, novoRegistro);
  }
}
