import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { Stage } from 'src/app/types';
import { StagesApiService } from '../stages-api/stages-api.service';
import { NotificationService } from '../notification/notification.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StagesService {
  private readonly stagesListSubject = new BehaviorSubject<Stage[] | undefined>(
    undefined
  );
  stagesList$ = this.stagesListSubject.asObservable();

  constructor(
    private stagesApiService: StagesApiService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.getStages();
  }

  getStages(): void {
    this.stagesApiService
      .getStages()
      .pipe(map(stages => stages.sort(this._sortByRoster)))
      .subscribe(
        stages => {
          stages.map(stage => {
            stage.styles = {
              'background-image': `url(/assets/uploads/${stage.image})`
            };
          });
          this.stagesListSubject.next(stages);
        },
        err => {
          this.notificationService.notify(`Couldn't fetch stages.`, 'Dismiss');
        }
      );
  }

  create(stageObject: Stage): void {
    this.stagesApiService.addStage(stageObject).subscribe(data => {
      this.notificationService.notify(
        `New stage "${data.name}" has been created.`,
        'OK'
      );
      this.getStages();
    });
  }

  delete(stage: Stage): void {
    const dialogDescription = `Confirm deleting ${stage.name}`;
    const dialogMessage = `Are you sure you want to delete ${stage.name}`;

    this._openDialog(dialogDescription, dialogMessage).subscribe(
      (responseUser: boolean) => {
        if (responseUser) {
          this.stagesApiService
            .deleteStage(stage._id)
            .subscribe((data: Stage) => {
              this.getStages();
              this.notificationService.notify(
                `"${stage.name}" has been deleted.`,
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
