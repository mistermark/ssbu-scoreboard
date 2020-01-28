import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'playerName', pure: true })
export class PlayerNamePipe implements PipeTransform {
  transform(playerName: string, playerTeam: string): string {
    if (playerTeam) {
      return playerTeam + ' | ' + playerName;
    }
    return playerName;
  }
}
