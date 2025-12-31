import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaPopup } from './beta-popup';

describe('BetaPopup', () => {
  let component: BetaPopup;
  let fixture: ComponentFixture<BetaPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetaPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetaPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});