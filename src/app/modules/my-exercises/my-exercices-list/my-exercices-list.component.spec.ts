import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExercicesListComponent } from './my-exercices-list.component';

describe('MyExercicesListComponent', () => {
  let component: MyExercicesListComponent;
  let fixture: ComponentFixture<MyExercicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExercicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExercicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
