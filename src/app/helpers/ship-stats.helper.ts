import {Ship} from '../models/ship.model';
import {Pilot} from '../models/pilot.model';
import {ShipStats} from '../models/ship-stats.model';
import * as _ from 'lodash';

export class ShipStatsHelper {
  public static getShipStats(ship: Ship, pilot: Pilot): ShipStats {
    const result = _.cloneDeep(ship.stats);

    if (pilot && pilot.stats) {
      if (pilot.stats.attack != null) {
        result.attack = pilot.stats.attack;
      }

      if (pilot.stats.energy != null) {
        result.energy = pilot.stats.energy;
      }

      if (pilot.stats.agility != null) {
        result.agility = pilot.stats.agility;
      }

      if (pilot.stats.hull != null) {
        result.hull = pilot.stats.hull;
      }

      if (pilot.stats.shield != null) {
        result.shield = pilot.stats.shield;
      }

      if (pilot.stats.firingArc != null) {
        result.firingArc = pilot.stats.firingArc;
      }
    }

    return result;
  }
}
