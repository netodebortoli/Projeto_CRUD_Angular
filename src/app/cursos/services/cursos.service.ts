import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from '../model/cursos';

import { delay, first, tap } from 'rxjs/operators';


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
}
