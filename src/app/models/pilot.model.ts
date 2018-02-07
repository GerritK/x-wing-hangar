import {Faction} from '../enums/faction.enum';
import {UpgradeType} from '../enums/upgrade-type.enum';
import {ShipStats} from './ship-stats.model';

export class Pilot {
  public id: string;
  public canonicalId?: string;
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
    result.faction = Faction.parse(data.faction);
    result.isUnique = data.isUnique;
    result.skill = data.skill;
    result.cost = data.cost;
    result.slots = UpgradeType.parseArray(data.slots);

    if (data.canonicalId) {
      result.canonicalId = data.canonicalId;
    }

    if (data.stats) {
      result.stats = ShipStats.fromData(data.stats);
    }

    return result;
  }
}
