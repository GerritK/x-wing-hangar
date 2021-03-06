export enum Action {
  FOCUS = 'focus',
  EVADE = 'evade',
  BARRELROLL = 'barrelroll',
  BOOST = 'boost',
  TARGETLOCK = 'targetlock',
  RECOVER = 'recover',
  REINFORCE = 'reinforce',
  COORDINATE = 'coordinate',
  JAM = 'jam',
  CLOAK = 'cloak',
  SLAM = 'slam',
  ROTATEARC = 'rotatearc',
  RELOAD = 'reload'
}

export namespace Action {
  export function parse(action: string): Action {
    let result;

    if (action) {
      result = Action[action.toUpperCase()];
    }

    if (!result) {
      console.error('invalid action "' + action + '"');
    }

    return result;
  }

  export function parseArray(actions: string[]): Action[] {
    const result = [];

    for (const value of actions) {
      const parsed = Action.parse(value);

      if (parsed) {
        result.push(parsed);
      }
    }

    return result;
  }
}
