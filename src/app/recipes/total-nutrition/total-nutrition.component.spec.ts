import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNutritionComponent } from './total-nutrition.component';

describe('TotalNutritionComponent', () => {
  let component: TotalNutritionComponent;
  let fixture: ComponentFixture<TotalNutritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNutritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
