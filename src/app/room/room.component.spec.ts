import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';

import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [RoomComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
