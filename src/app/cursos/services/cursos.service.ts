import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cursos } from '../model/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  list(): Cursos[] {
    return [
      { _id: '1', nome: 'Java Script', categoria: 'Front-End'}
    ]
  }
}
