import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEmpresaModal } from './nova-empresa-modal';

describe('NovaEmpresaModal', () => {
  let component: NovaEmpresaModal;
  let fixture: ComponentFixture<NovaEmpresaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaEmpresaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaEmpresaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
