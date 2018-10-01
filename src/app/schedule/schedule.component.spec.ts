import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [ScheduleComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
