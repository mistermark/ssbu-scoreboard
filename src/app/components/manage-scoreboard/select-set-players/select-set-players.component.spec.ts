import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSetPlayersComponent } from './select-set-players.component';

describe('PlayerSelectComponent', () => {
  let component: SelectSetPlayersComponent;
  let fixture: ComponentFixture<SelectSetPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSetPlayersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSetPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
