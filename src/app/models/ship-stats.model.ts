export class ShipStats {
  public attack: number;
  public agility: number;
  public hull: number;
  public shields: number;

  public static fromData(data): ShipStats {
    const result = new ShipStats();

    result.attack = data.attack;
    result.agility = data.agility;
    result.hull = data.hull;
    result.shields = data.shields;

    return result;
  }
}
