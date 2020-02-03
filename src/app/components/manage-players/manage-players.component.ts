import { Component, OnInit } from '@angular/core';

import { PlayersService } from '../../services/players/players.service';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.scss']
})
export class ManagePlayersComponent implements OnInit {
  private selectedPlayerSubject = new Subject();
  selectedPlayer$ = this.selectedPlayerSubject.asObservable();

  constructor(private readonly playersService: PlayersService) {}

  private _compareFn(a, b) {
    if (a.fullname < b.fullname) {
      return -1;
    }
    if (a.fullname > b.fullname) {
      return 1;
    }
    return 0;
  }

  ngOnInit() {}
}
