import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFacingContentFormComponent } from './user-facing-content-form.component';

describe('UserFacingContentFormComponent', () => {
  let component: UserFacingContentFormComponent;
  let fixture: ComponentFixture<UserFacingContentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFacingContentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFacingContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
