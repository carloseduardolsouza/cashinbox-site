import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEmpresaModal } from './editar-empresa-modal';

describe('EditarEmpresaModal', () => {
  let component: EditarEmpresaModal;
  let fixture: ComponentFixture<EditarEmpresaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpresaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpresaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
