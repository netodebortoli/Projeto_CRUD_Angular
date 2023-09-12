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
      )
  }

  saveCurso(registro: Partial<Cursos>) {
    if (registro._id) {
      return this.atualizar(registro);
    }
    return this.salvar(registro);
  }

  private atualizar(registro: Partial<Cursos>) {
    return this.httpClient.put<Cursos>(`${this.API}/${registro._id}`, registro);
  }

  private salvar(novoRegistro: Partial<Cursos>) {
    return this.httpClient.post<Cursos>(this.API, novoRegistro);
  }

  buscarCursoPorID(id: string) {
    return this.httpClient.get<Cursos>(`${this.API}/${id}`);
  }

  removerCursoPorID(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
