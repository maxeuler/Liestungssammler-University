import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePickerPage } from './module-picker.page';

describe('ModulePickerPage', () => {
  let component: ModulePickerPage;
  let fixture: ComponentFixture<ModulePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
