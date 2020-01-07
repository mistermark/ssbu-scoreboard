import { Pipe, PipeTransform } from '@angular/core';

import { Player } from '../types';

@Pipe({ name: 'playerName', pure: true })
export class PlayerNamePipe implements PipeTransform {
  transform(playerName: string, playerTeam: string): string {
    if (playerTeam) {
      return playerTeam + ' | ' + playerName;
    }
    return playerName;
  }
}
