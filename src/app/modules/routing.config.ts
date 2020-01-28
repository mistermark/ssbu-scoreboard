import { Routes } from '@angular/router';

import { ManagePlayersComponent } from '../components/manage-players/manage-players.component';
import { ManageCharactersComponent } from '../components/manage-characters/manage-characters.component';
import { ManageScoreboardComponent } from '../components/manage-scoreboard/manage-scoreboard.component';
import { ManageStagesComponent } from '../components/manage-stages/manage-stages.component';

export const appRoutes: Routes = [
  {
    path: 'players',
    component: ManagePlayersComponent
  },
  {
    path: 'characters',
    component: ManageCharactersComponent
  },
  {
    path: 'sets',
    component: ManageScoreboardComponent
  },
  {
    path: 'stages',
    component: ManageStagesComponent
  },
  // {
  //   path: 'games',
  //   component: ManageGamesComponent
  // },
  { path: '', redirectTo: '/stages', pathMatch: 'full' }
];
