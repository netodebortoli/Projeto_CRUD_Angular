import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cursos } from '../../model/cursos';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent {

  readonly displayedColumns = ['nome', 'categoria', 'acoes'];

  @Input() cursos: Cursos[] = [];
  @Output() add = new EventEmitter(false);

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }
}
