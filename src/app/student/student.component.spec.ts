import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { StudentComponent } from './student.component';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [StudentComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
