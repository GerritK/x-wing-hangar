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
}
