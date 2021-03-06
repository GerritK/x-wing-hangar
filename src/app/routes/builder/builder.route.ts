import {Component, ViewChild} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Faction} from '../../enums/faction.enum';
import {Pilot} from '../../models/pilot.model';
import {SquadronShip} from '../../models/squadron-ship.model';
import {Squadron} from '../../models/squadron.model';
import {TranslateService} from '@ngx-translate/core';
import {Upgrade} from '../../models/upgrade.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './builder.route.html',
  styleUrls: [
    './builder.route.scss'
  ]
})
export class BuilderRouteComponent {
  public readonly Faction = Faction;

  @ViewChild('shipSelector') shipSelector;

  public squadron: Squadron = new Squadron('', Faction.REBEL);

  public previewPilot: Pilot;

  constructor(private translate: TranslateService, private route: ActivatedRoute) {
    this.translate.get('ui.general.unnamed')
      .subscribe((result) => {
        this.squadron.name = result;
      });

    this.route.params.subscribe((event) => {
      this.setFaction(event.faction);
    });
  }

  public setFaction(faction: Faction) {
    this.squadron = new Squadron(this.translate.instant('ui.general.unnamed'), faction);

    this.previewPilot = null;
  }

  public addShip(ship: Ship) {
    const squadronShip = new SquadronShip();
    squadronShip.ship = ship;

    this.squadron.ships.push(squadronShip);

    setTimeout(() => this.shipSelector.ship = null);
  }

  public onShipChange(ship: Ship, squadronShip: SquadronShip) {
    squadronShip.ship = ship;
    squadronShip.pilot = null;
    squadronShip.upgrades = [];
  }

  public onPilotChange(pilot: Pilot, squadronShip: SquadronShip) {
    const upgrades = [];

    for (let i = 0; i < squadronShip.upgrades.length; i++) {
      const upgrade = squadronShip.upgrades[i];
      const type = squadronShip.pilot.slots[i];
      const newIndex = pilot.slots.findIndex((slot, index) => {
        return slot === type && !upgrades[index];
      });

      if (newIndex !== -1) {
        upgrades[newIndex] = upgrade;
      }
    }

    squadronShip.pilot = pilot;
    squadronShip.upgrades = upgrades;
  }

  public removeShip(index: number) {
    this.squadron.ships.splice(index, 1);

    this.previewPilot = null;
  }

  public echoSquadron() {
    console.log(this.squadron);
  }
}
