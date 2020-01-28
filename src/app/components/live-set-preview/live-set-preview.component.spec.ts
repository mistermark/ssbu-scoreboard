import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSetPreviewComponent } from './live-set-preview.component';

describe('LiveSetPreviewComponent', () => {
  let component: LiveSetPreviewComponent;
  let fixture: ComponentFixture<LiveSetPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveSetPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
