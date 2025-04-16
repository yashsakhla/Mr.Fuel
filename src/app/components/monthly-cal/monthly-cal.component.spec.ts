import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCalComponent } from './monthly-cal.component';

describe('MonthlyCalComponent', () => {
  let component: MonthlyCalComponent;
  let fixture: ComponentFixture<MonthlyCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
