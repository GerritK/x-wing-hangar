export enum UpgradeType {
  ELITE = 'elite',
  ASTROMECH = 'astromech',
  TORPEDO = 'torpedo',
  MISSILE = 'missile',
  CANNON = 'cannon',
  TURRET = 'turret',
  BOMB = 'bomb',
  CREW = 'crew',
  SALVAGEDASTROMECH = 'salvagedastromech',
  SYSTEM = 'system',
  TITLE = 'title',
  MODIFICATION = 'modification',
  ILLICIT = 'illicit',
  CARGO = 'cargo',
  HARDPOINT = 'hardpoint',
  TEAM = 'team',
  TECH = 'tech',
}

export namespace UpgradeType {
  export function parse(upgradeType: string): UpgradeType {
    let result;

    if (upgradeType) {
      result = UpgradeType[upgradeType.toUpperCase()];
    }

    if (!result) {
      console.error('invalid upgrade type "' + upgradeType + '"');
    }

    return result;
  }

  export function parseArray(upgradeTypes: string[]): UpgradeType[] {
    const result = [];

    for (const value of upgradeTypes) {
      const parsed = UpgradeType.parse(value);

      if (parsed) {
        result.push(parsed);
      }
    }

    return result;
  }
}
