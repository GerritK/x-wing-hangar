export class Expansion {
  public id: string;
  public shipIds: string[];
  public pilotIds: string[];
  public upgradeIds: string[];

  public static fromData(data): Expansion {
    const result = new Expansion();

    result.id = data.id;
    result.shipIds = data.ships;
    result.pilotIds = data.pilots;
    result.upgradeIds = data.upgrades;

    return result;
  }
}
