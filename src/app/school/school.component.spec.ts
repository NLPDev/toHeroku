import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { SchoolComponent } from './school.component';

describe('SchoolComponent', () => {
  let component: SchoolComponent;
  let fixture: ComponentFixture<SchoolComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [SchoolComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
