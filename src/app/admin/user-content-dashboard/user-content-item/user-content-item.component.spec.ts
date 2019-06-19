import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentItemComponent } from './user-content-item.component';

describe('UserContentItemComponent', () => {
  let component: UserContentItemComponent;
  let fixture: ComponentFixture<UserContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
