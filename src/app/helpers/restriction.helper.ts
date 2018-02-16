import {SquadronShip} from '../models/squadron-ship.model';
import {Upgrade} from '../models/upgrade.model';
import {Squadron} from '../models/squadron.model';
import {ShipStatsHelper} from './ship-stats.helper';
import {ShipStats} from '../models/ship-stats.model';

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
    return this.compare(ship.pilot.skill, restrictionData.value, restrictionData.operator);
  }

  public static attack(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    const stats: ShipStats = ShipStatsHelper.getShipStats(ship.ship, ship.pilot);

    return this.compare(stats.attack, restrictionData.value, restrictionData.operator);
  }

  public static agility(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    const stats: ShipStats = ShipStatsHelper.getShipStats(ship.ship, ship.pilot);

    return this.compare(stats.agility, restrictionData.value, restrictionData.operator);
  }

  public static hull(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    const stats: ShipStats = ShipStatsHelper.getShipStats(ship.ship, ship.pilot);

    return this.compare(stats.hull, restrictionData.value, restrictionData.operator);
  }

  public static shield(squadron: Squadron, ship: SquadronShip, upgrade: Upgrade, restrictionData: any) {
    const stats: ShipStats = ShipStatsHelper.getShipStats(ship.ship, ship.pilot);

    return this.compare(stats.shield, restrictionData.value, restrictionData.operator);
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

  private static compare(currentValue, value, operator) {
    let result;

    if (operator === '==') {
      result = currentValue === value;
    } else if (operator[0] === '>') {
      result = currentValue > value;

      if (operator.length > 1 && operator[1] === '=') {
        result = result || currentValue === value;
      }
    } else if (operator[0] === '<') {
      result = currentValue < value;

      if (operator.length > 1 && operator[1] === '=') {
        result = result || currentValue === value;
      }
    }

    return result;
  }
}
