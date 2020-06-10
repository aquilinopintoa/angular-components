import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumericMaskComponent } from './input-numeric-mask.component';

describe('InputNumericMaskComponent', () => {
  let component: InputNumericMaskComponent;
  let fixture: ComponentFixture<InputNumericMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumericMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumericMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
