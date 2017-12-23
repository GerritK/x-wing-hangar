import {Faction} from '../enums/faction.enum';
import {Action} from '../enums/action.enum';
import {ShipStats} from './ship-stats.model';
import {ShipSize} from '../enums/ship-size.enum';

export class Ship {
  public id: string;
  public factions: Faction[] = [];
  public stats: ShipStats;
  public actions: Action[] = [];
  public maneuvers: Array<number[]> = [];
  public size: ShipSize;

  public static fromData(data): Ship {
    const result = new Ship();

    result.id = data.id;
    result.factions = Faction.parseArray(data.factions);
    result.stats = ShipStats.fromData(data.stats);
    result.actions = Action.parseArray(data.actions);
    result.maneuvers = data.maneuvers;
    result.size = ShipSize.parse(data.size);

    return result;
  }
}
