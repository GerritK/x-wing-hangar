import {SquadronShip} from './squadron-ship.model';
import {Faction} from '../enums/faction.enum';

export class Squadron {
  public ships: SquadronShip[] = [];

  constructor(public name: string,
              public faction: Faction) {
  }

  public get cost(): number {
    let cost = 0;

    for (const ship of this.ships) {
      cost += ship.cost;
    }

    return cost;
  }

  public isUniqueUsed(id: string, squadronShipIndex): boolean {
    const uniqueId = id.split('-')[0];

    let usingShip = this.ships
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

    usingShip = this.ships
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
