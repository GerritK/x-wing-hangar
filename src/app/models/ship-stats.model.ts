import {FiringArc} from '../enums/firing-arc.enum';

export class ShipStats {
  public attack: number;
  public energy?: number;
  public agility: number;
  public hull: number;
  public shield: number;
  public firingArc: FiringArc;

  public static fromData(data): ShipStats {
    const result = new ShipStats();

    result.attack = data.attack;
    result.energy = data.energy;
    result.agility = data.agility;
    result.hull = data.hull;
    result.shield = data.shield;
    result.firingArc = FiringArc.parse(data.firingArc);

    return result;
  }
}
