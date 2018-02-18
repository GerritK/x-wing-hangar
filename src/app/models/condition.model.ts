export class Condition {
  public id: string;
  public isUnique: boolean;
  public upgrades: string[];
  public pilots: string[];

  public static fromData(data): Condition {
    const result = new Condition();

    result.id = data.id;
    result.isUnique = data.isUnique;
    result.upgrades = data.upgrades;
    result.pilots = data.pilots;

    return result;
  }
}
