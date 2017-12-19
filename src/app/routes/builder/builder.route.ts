import {Component, ViewChild} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Faction} from '../../enums/faction.enum';
import {Pilot} from '../../models/pilot.model';
import {SquadronShip} from '../../models/squadron-ship.model';
import {Squadron} from '../../models/squadron.model';
import {TranslateService} from '@ngx-translate/core';
import {Upgrade} from '../../models/upgrade.model';

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

  constructor(private translate: TranslateService) {
    this.translate.get('ui.general.unnamed')
      .subscribe((result) => {
        this.squadron.name = result;
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

  public removeShip(index: number) {
    this.squadron.ships.splice(index, 1);

    this.previewPilot = null;
  }

  public echoSquadron() {
    console.log(this.squadron);
  }
}
