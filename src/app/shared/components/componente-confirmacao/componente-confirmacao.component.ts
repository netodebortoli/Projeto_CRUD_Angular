import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-componente-confirmacao',
  templateUrl: './componente-confirmacao.component.html',
  styleUrls: ['./componente-confirmacao.component.scss']
})
export class ComponenteConfirmacaoComponent {

  constructor(
    public dialogRef: MatDialogRef<ComponenteConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensagem: string,
  ) { }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
