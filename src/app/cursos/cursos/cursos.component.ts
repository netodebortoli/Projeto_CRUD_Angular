import { Component, OnInit } from '@angular/core';
import { Cursos } from '../model/cursos';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Cursos[] = [];
  displayedColumns = ['nome', 'categoria'];

  constructor(private cursoServico: CursosService) {
  }

  ngOnInit(): void {
    this.cursos = this.cursoServico.list();
  }
}
