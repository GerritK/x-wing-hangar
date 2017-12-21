import {Ship} from './ship.model';
import {Pilot} from './pilot.model';
import {Upgrade} from './upgrade.model';

export class SquadronShip {
  public ship: Ship;
  public pilot: Pilot;
  public upgrades: Upgrade[] = [];

  public get cost(): number {
    let cost = 0;

    if (this.pilot) {
      cost += this.pilot.cost;
    }

    for (const upgrade of this.upgrades) {
      if (upgrade) {
        cost += upgrade.cost;
      }
    }

    return cost;
  }

  public hasUpgradeEquipped(id: string, upgradeIndex: number): boolean {
    for (let i = 0; i < this.upgrades.length; i++) {
      const upgrade = this.upgrades[i];

      if (upgrade && upgrade.isLimited && upgrade.id === id && upgradeIndex !== i) {
        return true;
      }
    }

    return false;
  }
}
