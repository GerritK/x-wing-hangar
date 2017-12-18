import {Component} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Pilot} from '../../models/pilot.model';
import {ShipProvider} from '../../providers/ship.provider';
import {PilotProvider} from '../../providers/pilot.provider';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './pilot-select.dialog.html',
  styleUrls: [
    './pilot-select.dialog.scss'
  ]
})
export class PilotSelectDialogComponent {
  public allShips = [];
  public shipPilots = [];

  public ship: Ship;
  public pilot: Pilot;

  constructor(public dialogRef: MatDialogRef<PilotSelectDialogComponent>,
              private ships: ShipProvider,
              private pilots: PilotProvider) {
    this.ships.allShips.subscribe((data) => {
      this.allShips = data;
    });
  }

  public onShipChange(ship) {
    this.ship = ship;

    this.shipPilots = this.pilots.getByShipId(ship.id);
    this.pilot = null;
  }

  public onAdd() {
    this.dialogRef.close(this.pilot);
  }
}
