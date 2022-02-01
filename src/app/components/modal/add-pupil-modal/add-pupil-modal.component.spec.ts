import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPupilModalComponent } from './add-pupil-modal.component';

describe('AddPupilModalComponent', () => {
  let component: AddPupilModalComponent;
  let fixture: ComponentFixture<AddPupilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPupilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPupilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
