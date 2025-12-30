import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Precos } from './precos';

describe('Precos', () => {
  let component: Precos;
  let fixture: ComponentFixture<Precos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Precos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Precos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
