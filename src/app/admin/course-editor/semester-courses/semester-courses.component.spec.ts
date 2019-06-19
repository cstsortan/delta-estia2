import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCoursesComponent } from './semester-courses.component';

describe('SemesterCoursesComponent', () => {
  let component: SemesterCoursesComponent;
  let fixture: ComponentFixture<SemesterCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
