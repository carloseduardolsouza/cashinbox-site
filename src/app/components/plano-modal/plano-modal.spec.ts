import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoModal } from './plano-modal';

describe('PlanoModal', () => {
  let component: PlanoModal;
  let fixture: ComponentFixture<PlanoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
