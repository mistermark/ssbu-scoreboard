import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { Character } from 'src/app/types';
import { CharactersApiService } from 'src/app/services/characters-api/characters-api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly charactersListSubject = new BehaviorSubject<
    Character[] | undefined
  >(undefined);
  charactersList$ = this.charactersListSubject.asObservable();

  constructor(
    private charactersApiService: CharactersApiService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.getCharacters();
  }

  create(characterObject: Character): void {
    this.charactersApiService.addCharacter(characterObject).subscribe(data => {
      this.notificationService.notify(
        `New character "${data.name}" has been created.`,
        'OK'
      );
      this.getCharacters();
    });
  }

  createBulk(characterCSV: any): void {
    const lines = characterCSV.split('\n');
    const bulkArray: Character[] = [];

    for (const charLine of lines) {
      const charLineValues = charLine.split(',');
      bulkArray.push({
        name: charLineValues[0],
        image: charLineValues[1]
      });
    }
    this.charactersApiService.addBulkCharacter(bulkArray).subscribe(data => {
      this.notificationService.notify(
        `New characters have been created.`,
        'OK'
      );
      this.getCharacters();
    });
  }

  getCharacters(): void {
    this.charactersApiService
      .getCharacters()
      .pipe(map(characters => characters.sort(this._sortByRoster)))
      .subscribe(
        characters => {
          characters.map(character => {
            character.styles = {
              'background-image': `url(/assets/images/characters/${character.image})`
            };
          });
          this.charactersListSubject.next(characters);
        },
        err => {
          this.notificationService.notify(
            `Couldn't fetch characters.`,
            'Dismiss'
          );
        }
      );
  }

  getCharacter(character: string) {
    // return this.characterListSubject.value.find(
    //   element => element.name === character
    // );
  }

  update(character: Character): void {
    this.charactersApiService
      .updateCharacter(character)
      .subscribe((data: Character) => {
        this.getCharacters();
        this.notificationService.notify(
          `"${data.name}" has been updated.`,
          'OK'
        );
      });
  }

  delete(character: Character): void {
    const dialogDescription = `Confirm deleting ${character.name}`;
    const dialogMessage = `Are you sure you want to delete ${character.name}`;

    this._openDialog(dialogDescription, dialogMessage).subscribe(
      (responseUser: boolean) => {
        if (responseUser) {
          this.charactersApiService
            .deleteCharacter(character._id)
            .subscribe((data: Character) => {
              this.getCharacters();
              this.notificationService.notify(
                `"${character.name}" has been deleted.`,
                'OK'
              );
            });
        }
      }
    );
  }

  private _sortByRoster(a, b): any {
    if (a.roster < b.roster) {
      return -1;
    }
    if (a.roster > b.roster) {
      return 1;
    }
    return 0;
  }

  private _openDialog(description: string, message: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        description,
        message
      }
    });

    return dialogRef.afterClosed();
  }
}
