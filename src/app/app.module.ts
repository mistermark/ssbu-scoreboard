import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { appRoutes } from './modules/routing.config';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { PlayerScoreComponent } from './components/scoreboard/player-score/player-score.component';
import { ManageScoreboardComponent } from './components/manage-scoreboard/manage-scoreboard.component';
import { ManagePlayersComponent } from './components/manage-players/manage-players.component';
import { CharacterSelectComponent } from './components/character-select/character-select.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PlayersListComponent } from './components/manage-players/players-list/players-list.component';
import { PlayerDetailsComponent } from './components/manage-players/player-details/player-details.component';
import { PlayerNamePipe } from './modules/player-fullname.pipe';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LiveSetPreviewComponent } from './components/live-set-preview/live-set-preview.component';
import { ManageCharactersComponent } from './components/manage-characters/manage-characters.component';
import { ImagePathPipe } from './modules/image-path.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { ManageStagesComponent } from './components/manage-stages/manage-stages.component';
import { StageTypePipe } from './modules/stage-type.pipe';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ScoreboardComponent,
    PlayerScoreComponent,
    ManageScoreboardComponent,
    ManagePlayersComponent,
    CharacterSelectComponent,
    MessagesComponent,
    PlayersListComponent,
    PlayerDetailsComponent,
    PlayerNamePipe,
    PageHeaderComponent,
    LiveSetPreviewComponent,
    ManageCharactersComponent,
    ImagePathPipe,
    DialogComponent,
    ManageStagesComponent,
    StageTypePipe,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [PlayerNamePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
