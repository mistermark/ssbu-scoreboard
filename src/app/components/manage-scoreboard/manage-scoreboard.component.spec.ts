import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScoreboardComponent } from './manage-scoreboard.component';

describe('ManageScoreboardComponent', () => {
  let component: ManageScoreboardComponent;
  let fixture: ComponentFixture<ManageScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
