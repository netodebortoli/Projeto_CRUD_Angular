import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { ComponenteConfirmacaoComponent } from './components/componente-confirmacao/componente-confirmacao.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoriaPipe,
    ComponenteConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoriaPipe,
    ComponenteConfirmacaoComponent
  ]
})
export class SharedModule { }
