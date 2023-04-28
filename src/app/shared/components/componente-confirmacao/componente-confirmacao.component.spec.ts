import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteConfirmacaoComponent } from './componente-confirmacao.component';

describe('ComponenteConfirmacaoComponent', () => {
  let component: ComponenteConfirmacaoComponent;
  let fixture: ComponentFixture<ComponenteConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteConfirmacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
