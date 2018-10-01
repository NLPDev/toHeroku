import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [CourseComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
