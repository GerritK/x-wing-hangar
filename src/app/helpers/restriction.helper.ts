import {SquadronShip} from '../models/squadron-ship.model';
import {Upgrade} from '../models/upgrade.model';
import {Squadron} from '../models/squadron.model';

export class RestrictionHelper {
  public static isUseable(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade) {
    for (const restriction of upgrade.restrictions) {
      if (!RestrictionHelper.callRestrictionFunction(squadron, ship, upgrade, restriction)) {
        return false;
      }
    }

    return true;
  }

  public static or(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    for (const restriction of restrictionData.value) {
      if (RestrictionHelper.callRestrictionFunction(squadron, ship, upgrade, restriction)) {
        return true;
      }
    }

    return false;
  }

  public static not(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return !RestrictionHelper.callRestrictionFunction(squadron, ship, upgrade, restrictionData.value);
  }

  public static shipId(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.ship.id === restrictionData.value;
  }

  public static shipSize(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.ship.size === restrictionData.value;
  }

  public static faction(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.pilot.faction === restrictionData.value;
  }

  public static hasSlot(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.pilot.slots.findIndex((slot) => slot === restrictionData.value) !== -1;
  }

  public static hasAction(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.ship.actions.findIndex((action) => action === restrictionData.value) !== -1;
  }

  public static limit(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    const count = squadron.ships.filter((s) => s !== ship && s.hasUpgradeEquipped(upgrade.id)).length;

    return count < restrictionData.value;
  }

  public static skill(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
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

  public static isTIE(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.ship.id.startsWith('tie');
  }

  public static isXWing(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    return ship.ship.id === 'xwing' || ship.ship.id === 't70xwing';
  }

  private static callRestrictionFunction(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restriction: any) {
    return RestrictionHelper[restriction.fnc](squadron, ship, upgrade, restriction);
  }
}
