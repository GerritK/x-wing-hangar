export enum Faction {
  REBEL = 'rebel',
  RESISTANCE = 'resistance',
  IMPERIAL = 'imperial',
  FIRSTORDER = 'first_order',
  SCUM = 'scum',
}

export namespace Faction {
  export function parse(faction: string): Faction {
    let result;

    if (faction) {
      result = Faction[faction.toUpperCase()];
    }

    if (!result) {
      console.error('invalid faction "' + faction + '"');
    }

    return result;
  }

  export function parseArray(factions: string[]): Faction[] {
    const result = [];

    for (const value of factions) {
      const parsed = Faction.parse(value);

      if (parsed) {
        result.push(parsed);
      }
    }

    return result;
  }
}
