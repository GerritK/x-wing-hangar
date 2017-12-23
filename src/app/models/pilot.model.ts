import {Faction} from '../enums/faction.enum';
import {UpgradeType} from '../enums/upgrade-type.enum';
import {ShipStats} from './ship-stats.model';

export class Pilot {
  public id: string;
  public shipId: string;
  public faction: Faction;
  public isUnique: boolean;
  public skill: number;
  public cost: number;
  public slots: UpgradeType[] = [];
  public stats: ShipStats;

  public static fromData(data): Pilot {
    const result = new Pilot();

    result.id = data.id;
    result.shipId = data.shipId;
    result.faction = data.faction;
    result.isUnique = data.isUnique;
    result.skill = data.skill;
    result.cost = data.cost;
    result.slots = data.slots;

    if (data.stats) {
      result.stats = ShipStats.fromData(data.stats);
    }

    return result;
  }
}
