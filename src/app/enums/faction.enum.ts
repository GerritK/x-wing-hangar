export enum Faction {
  REBEL = 'rebel',
  RESISTANCE = 'resistance',
  IMPERIAL = 'imperial',
  FIRST_ORDER = 'first_order',
  SCUM = 'scum',
}

export namespace Faction {
  export function parse(faction: string): Faction {
    if (faction) {
      return Faction[faction.toUpperCase()];
    }

    return undefined;
  }
}
