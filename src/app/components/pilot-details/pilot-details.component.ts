import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Pilot} from '../../models/pilot.model';
import {Ship} from '../../models/ship.model';
import {ShipProvider} from '../../providers/ship.provider';

@Component({
  selector: 'xwh-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: [
    './pilot-details.component.scss'
  ]
})
export class PilotDetailsComponent implements OnChanges {
  @Input() pilot: Pilot;

  public ship: Ship;

  constructor(private ships: ShipProvider) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pilot != null) {
      if (this.pilot != null) {
        this.ship = this.ships.getById(this.pilot.shipId);
      } else {
        this.ship = null;
      }
    }
  }
}
