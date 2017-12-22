export enum ShipSize {
  SMALL = 'small',
  LARGE = 'large',
  HUGE = 'huge'
}

export namespace ShipSize {
  export function parse(shipSize: string): ShipSize {
    if (shipSize) {
      return ShipSize[shipSize.toUpperCase()];
    }

    return undefined;
  }
}
