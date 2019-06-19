import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentDashboardComponent } from './user-content-dashboard.component';

describe('UserContentDashboardComponent', () => {
  let component: UserContentDashboardComponent;
  let fixture: ComponentFixture<UserContentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
