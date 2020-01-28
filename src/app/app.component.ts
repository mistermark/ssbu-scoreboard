import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SSBU Scoreboard';
  navItems = [
    {
      label: 'Sets',
      route: '/sets'
    },
    {
      label: 'Players',
      route: '/players'
    },
    {
      label: 'Characters',
      route: '/characters'
    },
    {
      label: 'Stages',
      route: '/stages'
    }
  ];
}
