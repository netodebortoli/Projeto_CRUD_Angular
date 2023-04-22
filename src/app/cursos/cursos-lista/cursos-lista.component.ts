import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cursos } from '../model/cursos';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent {

  readonly displayedColumns = ['nome', 'categoria', 'acoes'];
  @Input() cursos: Cursos[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

}
