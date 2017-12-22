export enum UpgradeType {
  ELITE = 'elite',
  ASTROMECH = 'amd',
  TORPEDO = 'torpedo',
  MISSILE = 'missile',
  CANNON = 'cannon',
  TURRET = 'turret',
  BOMB = 'bomb',
  CREW = 'crew',
  SALVAGED_ASTROMECH = 'salvagedastromech',
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
    if (upgradeType) {
      return UpgradeType[upgradeType.toUpperCase()];
    }

    return undefined;
  }
}
