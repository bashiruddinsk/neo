import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHolderDetailsComponent } from './card-holder-details.component';

describe('CardHolderDetailsComponent', () => {
  let component: CardHolderDetailsComponent;
  let fixture: ComponentFixture<CardHolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardHolderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
