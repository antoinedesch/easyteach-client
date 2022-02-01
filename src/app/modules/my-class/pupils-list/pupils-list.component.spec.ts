import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsListComponent } from './pupils-list.component';

describe('MyClassComponent', () => {
  let component: PupilsListComponent;
  let fixture: ComponentFixture<PupilsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PupilsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
