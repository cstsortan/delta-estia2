import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulLinksPageComponent } from './useful-links-page.component';

describe('UsefulLinksPageComponent', () => {
  let component: UsefulLinksPageComponent;
  let fixture: ComponentFixture<UsefulLinksPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefulLinksPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulLinksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
