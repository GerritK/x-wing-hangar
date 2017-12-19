import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Faction} from '../../enums/faction.enum';
import * as _ from 'lodash';

@Component({
  selector: 'xwh-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: [
    './maneuver.component.scss'
  ]
})
export class ManeuverComponent implements OnChanges {
  @Input() ship: Ship;
  @Input() faction: Faction;

  public shipManeuvers: Array<number[]>;
  public speedOffset = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ship) {
      this.updateShipManeuvers();
    }
  }

  private updateShipManeuvers() {
    if (this.ship != null) {
      this.shipManeuvers = _.cloneDeep(this.ship.maneuvers);

      // ignoring first maneuver speeds without maneuvers (typically speed 0)
      for (let i = 0; i < this.shipManeuvers.length; i++) {
        const maneuverCount = _.reduce(this.shipManeuvers[i], (sum, n) => sum + n, 0);

        if (maneuverCount === 0) {
          this.speedOffset++;
        } else {
          break;
        }
      }

      this.shipManeuvers.splice(0, this.speedOffset);

      // ignoring maneuver types without any maneuver set
      for (let i = 0; i < this.shipManeuvers[0].length; i++) {
        const maneuversOfType = _.reduce(this.shipManeuvers, (sum, n) => sum + n[i], 0);

        if (maneuversOfType === 0) {
          for (let n = 0; n < this.shipManeuvers.length; n++) {
            this.shipManeuvers[n][i] = -1;
          }
        }
      }

      this.shipManeuvers = _.reverse(this.shipManeuvers);
    } else {
      this.shipManeuvers = [];
    }
  }
}
