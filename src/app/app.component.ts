import {Component} from '@angular/core';
import {ShipProvider} from './providers/ship.provider';
import {Pilot} from './models/pilot.model';
import {PilotProvider} from './providers/pilot.provider';
import {Ship} from './models/ship.model';

@Component({
  selector: 'xwh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public allShips = [];
  public shipPilots = [];

  public ship: Ship;
  public pilot: Pilot;

  constructor(private ships: ShipProvider,
              private pilots: PilotProvider) {
    this.ships.allShips.subscribe((data) => {
      this.allShips = data;
    });

    pilots.allPilots.subscribe((data) => {
      this.pilot = data[0];
    });
  }

  public onShipChange(ship) {
    this.ship = ship;

    this.shipPilots = this.pilots.getByShipId(ship.id);
    this.pilot = null;
  }
}
