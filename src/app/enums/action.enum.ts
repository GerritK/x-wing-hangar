export enum Action {
  FOCUS = 'focus',
  EVADE = 'evade',
  BARREL_ROLL = 'barrelroll',
  BOOST = 'boost',
  TARGET_LOCK = 'targetlock'
}

export namespace Action {
  export function parse(action: string): Action {
    if (action) {
      return Action[action.toUpperCase()];
    }

    return undefined;
  }
}
