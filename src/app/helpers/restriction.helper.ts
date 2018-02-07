import {SquadronShip} from '../models/squadron-ship.model';
import {Upgrade} from '../models/upgrade.model';

export class RestrictionHelper {
  public static isUseable(ship: SquadronShip, upgrade: Upgrade) {
    for (const restriction of upgrade.restrictions) {
      if (!RestrictionHelper.callRestrictionFunction(ship, restriction)) {
        return false;
      }
    }

    return true;
  }

  public static or(ship: SquadronShip, restrictionData: any) {
    for (const restriction of restrictionData.value) {
      if (RestrictionHelper.callRestrictionFunction(ship, restriction)) {
        return true;
      }
    }

    return false;
  }

  public static not(ship: SquadronShip, restrictionData: any) {
    return !RestrictionHelper.callRestrictionFunction(ship, restrictionData.value);
  }

  public static shipId(ship: SquadronShip, restrictionData: any) {
    return ship.ship.id === restrictionData.value;
  }

  public static shipSize(ship: SquadronShip, restrictionData: any) {
    return ship.ship.size === restrictionData.value;
  }

  public static faction(ship: SquadronShip, restrictionData: any) {
    return ship.pilot.faction === restrictionData.value;
  }

  public static hasSlot(ship: SquadronShip, restrictionData: any) {
    return ship.pilot.slots.findIndex((slot) => slot === restrictionData.value) !== -1;
  }

  public static hasAction(ship: SquadronShip, restrictionData: any) {
    return ship.ship.actions.findIndex((action) => action === restrictionData.value) !== -1;
  }

  public static skill(ship: SquadronShip, restrictionData: any) {
    let result;

    if (restrictionData.operator === '==') {
      result = ship.pilot.skill === restrictionData.value;
    } else if (restrictionData.operator[0] === '>') {
      result = ship.pilot.skill > restrictionData.value;

      if (restrictionData.operator.length > 1 && restrictionData.operator[1] === '=') {
        result = result || ship.pilot.skill === restrictionData.value;
      }
    } else if (restrictionData.operator[0] === '<') {
      result = ship.pilot.skill < restrictionData.value;

      if (restrictionData.operator.length > 1 && restrictionData.operator[1] === '=') {
        result = result || ship.pilot.skill === restrictionData.value;
      }
    }

    return result;
  }

  public static isTIE(ship: SquadronShip, restrictionData: any) {
    return ship.ship.id.startsWith('tie');
  }

  private static callRestrictionFunction(ship: SquadronShip, restriction: any) {
    return RestrictionHelper[restriction.fnc](ship, restriction);
  }
}
