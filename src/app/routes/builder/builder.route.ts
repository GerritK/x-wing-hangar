import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PilotSelectDialogComponent} from '../../dialogs/pilot-select/pilot-select.dialog';
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

  public faction: Faction = Faction.REBEL;
  public selectedPilots: any[] = [];

  public previewPilot: Pilot;

  constructor(private dialog: MatDialog) {
  }

  public addShip(ship: Ship) {
    this.selectedPilots.push({
      pilot: null,
      ship: ship
    });

    setTimeout(() => this.shipSelector.ship = null);
  }

  public openAddDialog() {
    const dialogRef = this.dialog.open(PilotSelectDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result != null) {
        this.selectedPilots.push(result);
      }
    });
  }
}
