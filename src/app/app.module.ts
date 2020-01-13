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

import { appRoutes } from './modules/routing.config';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { PlayerScoreComponent } from './components/scoreboard/player-score/player-score.component';
import { ManageScoreboardComponent } from './components/manage-scoreboard/manage-scoreboard.component';
import { ManagePlayersComponent } from './components/manage-players/manage-players.component';
import { SelectSetPlayersComponent } from './components/manage-scoreboard/select-set-players/select-set-players.component';
import { CharacterSelectComponent } from './components/character-select/character-select.component';
import { ScoreboardScoreComponent } from './components/manage-scoreboard/scoreboard-score/scoreboard-score.component';
import { AddPlayerComponent } from './components/manage-players/add-player/add-player.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PlayersListComponent } from './components/manage-players/players-list/players-list.component';
import { PlayerDetailsComponent } from './components/manage-players/player-details/player-details.component';
import { PlayerNamePipe } from './modules/player-fullname.pipe';
import { SelectGamesetComponent } from './components/manage-scoreboard/select-gameset/select-gameset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ScoreboardComponent,
    PlayerScoreComponent,
    ManageScoreboardComponent,
    ManagePlayersComponent,
    SelectSetPlayersComponent,
    CharacterSelectComponent,
    ScoreboardScoreComponent,
    AddPlayerComponent,
    MessagesComponent,
    PlayersListComponent,
    PlayerDetailsComponent,
    PlayerNamePipe,
    SelectGamesetComponent
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
    MatSnackBarModule
  ],
  providers: [PlayerNamePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
