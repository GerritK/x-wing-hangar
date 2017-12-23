export enum ShipSize {
  SMALL = 'small',
  LARGE = 'large',
  HUGE = 'huge'
}

export namespace ShipSize {
  export function parse(shipSize: string): ShipSize {
    let result;

    if (shipSize) {
      result = ShipSize[shipSize.toUpperCase()];
    }

    if (!result) {
      console.error('invalid ship size "' + shipSize + '"');
    }

    return undefined;
  }
}
