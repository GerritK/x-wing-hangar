import {Component} from '@angular/core';
import {ShipProvider} from './providers/ship.provider';
import {Pilot} from './models/pilot.model';
import {PilotProvider} from './providers/pilot.provider';
import {Ship} from './models/ship.model';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'xwh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

  }
}
