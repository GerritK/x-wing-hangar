import {Component, Input} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Pilot} from '../../models/pilot.model';

@Component({
  selector: 'xwh-ship-stats',
  templateUrl: './ship-stats.component.html',
  styleUrls: [
    './ship-stats.component.scss'
  ]
})
export class ShipStatsComponent {
  @Input() ship: Ship;
  @Input() pilot: Pilot;
}
