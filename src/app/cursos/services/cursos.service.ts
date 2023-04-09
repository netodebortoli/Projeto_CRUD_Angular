import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from '../model/cursos';

import { delay, first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = '/assets/cursos.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Cursos[]>(this.API).
    pipe(
      first(),
      delay(5000),
        tap(cursos => console.log(cursos))
    )
  }
}
