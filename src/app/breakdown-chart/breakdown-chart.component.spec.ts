import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownChartComponent } from './breakdown-chart.component';

describe('BreakdownChartComponent', () => {
  let component: BreakdownChartComponent;
  let fixture: ComponentFixture<BreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakdownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
