import { Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ScoreboardComponent } from '../components/scoreboard/scoreboard.component';

export const appRoutes: Routes = [
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
