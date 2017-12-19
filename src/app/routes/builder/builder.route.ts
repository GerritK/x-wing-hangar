import {Component, ViewChild} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Faction} from '../../enums/faction.enum';
import {Pilot} from '../../models/pilot.model';

@Component({
  templateUrl: './builder.route.html',
  styleUrls: [
    './builder.route.scss'
  ]
})
export class BuilderRouteComponent {
  @ViewChild('shipSelector') shipSelector;

  public readonly Faction = Faction;
  public faction: Faction = Faction.REBEL;
  public selectedPilots: any[] = [];

  public previewPilot: Pilot;

  constructor() {
  }

  public setFaction(faction: Faction) {
    this.faction = faction;
    this.selectedPilots = [];
    this.previewPilot = null;
  }

  public addShip(ship: Ship) {
    this.selectedPilots.push({
      pilot: null,
      ship: ship
    });

    setTimeout(() => this.shipSelector.ship = null);
  }
}
