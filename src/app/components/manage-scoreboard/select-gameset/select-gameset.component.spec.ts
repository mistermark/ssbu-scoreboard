import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGamesetComponent } from './select-gameset.component';

describe('SelectGamesetComponent', () => {
  let component: SelectGamesetComponent;
  let fixture: ComponentFixture<SelectGamesetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGamesetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGamesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
