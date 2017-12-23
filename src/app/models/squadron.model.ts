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

  public isUniqueUsed(id: string): boolean {
    const uniqueId = id.split('-')[0];

    let usingShip = this.ships
      .filter((ship) => ship.pilot && ship.pilot.isUnique)
      .findIndex((ship) => {
        if (ship.pilot && ship.pilot.isUnique) {
          const uniquePilotId = ship.pilot.id.split('-')[0];

          return uniquePilotId === uniqueId;
        }

        return false;
      });

    if (usingShip !== -1) {
      return true;
    }

    usingShip = this.ships
      .findIndex((ship) => {
        for (const upgrade of ship.upgrades) {
          if (upgrade && upgrade.isUnique) {
            const uniqueUpgradeId = upgrade.id.split('-')[0];

            if (uniqueUpgradeId === uniqueId) {
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
