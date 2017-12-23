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

  public static shipIdOnly(ship: SquadronShip, restrictionData: any) {
    return ship.ship.id === restrictionData.value;
  }
}
