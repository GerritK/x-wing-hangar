import {Faction} from '../enums/faction.enum';
import {Action} from '../enums/action.enum';
import {ShipStats} from './ship-stats.model';

export class Ship {
  public id: string;
  public factions: Faction[] = [];
  public stats: ShipStats;
  public actions: Action[] = [];
  public maneuvers: Array<number[]> = [];

  public static fromData(data): Ship {
    const result = new Ship();

    result.id = data.id;
    result.factions = data.factions;
    result.stats = ShipStats.fromData(data.stats);
    result.actions = data.actions;
    result.maneuvers = data.maneuvers;

    return result;
  }
}
