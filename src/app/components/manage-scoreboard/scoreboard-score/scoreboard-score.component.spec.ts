import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardScoreComponent } from './scoreboard-score.component';

describe('ScoreboardScoreComponent', () => {
  let component: ScoreboardScoreComponent;
  let fixture: ComponentFixture<ScoreboardScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
