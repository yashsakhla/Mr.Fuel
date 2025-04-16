import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsrReadingComponent } from './dsr-reading.component';

describe('DsrReadingComponent', () => {
  let component: DsrReadingComponent;
  let fixture: ComponentFixture<DsrReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsrReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsrReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
