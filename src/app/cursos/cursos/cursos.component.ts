import { Component, OnInit } from '@angular/core';
import { Cursos } from '../model/cursos';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Cursos[] = [];
  displayedColumns = ['nome', 'categoria'];

  constructor() {
    this.cursos = [
      { _id: '1', nome: 'Java Script', categoria: 'Front-End'}
    ];
  }

  ngOnInit(): void {

  }
}
