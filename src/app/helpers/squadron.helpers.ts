import {Squadron} from '../models/squadron.model';

export class SquadronHelpers {
  public static isUniqueUsed(id: string, squadron: Squadron, squadronShipIndex: number): boolean {
    const uniqueId = id.split('-')[0];

    let usingShip = squadron.ships
      .filter((ship) => ship.pilot && ship.pilot.isUnique)
      .findIndex((ship, shipIndex) => {
        if (ship.pilot && ship.pilot.isUnique) {
          const uniquePilotId = ship.pilot.id.split('-')[0];

          return uniquePilotId === uniqueId && (shipIndex !== squadronShipIndex || ship.pilot.id !== id);
        }

        return false;
      });

    if (usingShip !== -1) {
      return true;
    }

    usingShip = squadron.ships
      .findIndex((ship, shipIndex) => {
        for (const upgrade of ship.upgrades) {
          if (upgrade && upgrade.isUnique) {
            const uniqueUpgradeId = upgrade.id.split('-')[0];

            if (uniqueUpgradeId === uniqueId && (shipIndex !== squadronShipIndex || upgrade.id !== id)) {
              return true;
            }
          }
        }

        return false;
      });

    if (usingShip !== -1) {
      return true;
    }

    return false;
  }
}
