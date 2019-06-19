import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsEditorComponent } from './instructors-editor.component';

describe('InstructorsEditorComponent', () => {
  let component: InstructorsEditorComponent;
  let fixture: ComponentFixture<InstructorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
