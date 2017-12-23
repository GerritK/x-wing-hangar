import {UpgradeType} from '../enums/upgrade-type.enum';

export class Upgrade {
  public id: string;
  public types: UpgradeType[] = [];
  public cost: number;
  public isUnique: boolean;
  public isLimited: boolean;
  public modifiers: any[] = []; // TODO: add correct type!
  public restrictions: any[] = []; // TODO: add correct type!

  public static fromData(data): Upgrade {
    const result = new Upgrade();

    result.id = data.id;
    result.types = UpgradeType.parseArray(data.types);
    result.cost = data.cost;
    result.isUnique = data.isUnique;
    result.isLimited = data.isLimited;
    result.modifiers = data.modifiers;
    result.restrictions = data.restrictions;

    return result;
  }
}
