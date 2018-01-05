import {SquadronShip} from '../models/squadron-ship.model';
import {Upgrade} from '../models/upgrade.model';

export class RestrictionHelper {
  public static isUseable(ship: SquadronShip, upgrade: Upgrade) {
    for (const restriction of upgrade.restrictions) {
      if (!RestrictionHelper[restriction.fnc](ship, restriction)) {
        return false;
      }
    }

    return true;
  }

  public static shipId(ship: SquadronShip, restrictionData: any) {
    return ship.ship.id === restrictionData.value;
  }

  public static shipSize(ship: SquadronShip, restrictionData: any) {
    return ship.ship.size === restrictionData.value;
  }
}
