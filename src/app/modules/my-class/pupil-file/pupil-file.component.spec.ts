import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilFileComponent } from './pupil-file.component';

describe('PupilFileComponent', () => {
  let component: PupilFileComponent;
  let fixture: ComponentFixture<PupilFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PupilFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
