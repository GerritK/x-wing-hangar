export enum FiringArc {
  DEFAULT = '',
  TURRET = 'turret',
  FRONTBACK = 'frontback',
  DEGREE180 = '180',
  BULLSEYE = 'bullseye'
}

export namespace FiringArc {
  export function parse(firingArc: string): FiringArc {
    let result;

    if (firingArc) {
      result = FiringArc[firingArc.toUpperCase()];
    }

    if (!result) {
      if (firingArc) {
        console.error('invalid firing arc "' + firingArc + '"');
      }
      result = FiringArc.DEFAULT;
    }

    return result;
  }
}
