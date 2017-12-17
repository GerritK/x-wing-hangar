import {UpgradeType} from '../enums/upgrade-type.enum';

export class Upgrade {
  public id: string;
  public types: UpgradeType[] = [];
  public cost: number;
  public isUnique: boolean;
  public isLimited: boolean;
  public modifiers: any[] = []; // TODO: add correct type!
}
