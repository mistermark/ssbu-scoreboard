import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStagesComponent } from './manage-stages.component';

describe('ManageStagesComponent', () => {
  let component: ManageStagesComponent;
  let fixture: ComponentFixture<ManageStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
