import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomeditComponent } from './roomedit.component';

describe('RoomeditComponent', () => {
  let component: RoomeditComponent;
  let fixture: ComponentFixture<RoomeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
