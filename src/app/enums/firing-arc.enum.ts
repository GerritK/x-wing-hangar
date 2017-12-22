export enum FiringArc {
  DEFAULT = '',
  TURRET = 'turret',
  FRONT_BACK = 'frontback',
  DEGREE180 = '180'
}

export namespace FiringArc {
  export function parse(firingArc: string): FiringArc {
    if (firingArc) {
      return FiringArc[firingArc.toUpperCase()];
    }

    return undefined;
  }
}
