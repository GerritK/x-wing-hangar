import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {PilotSelectDialogComponent} from '../../dialogs/pilot-select/pilot-select.dialog';
import {Pilot} from '../../models/pilot.model';

@Component({
  templateUrl: './builder.route.html',
  styleUrls: [
    './builder.route.scss'
  ]
})
export class BuilderRouteComponent {
  public selectedPilots: Pilot[] = [];

  constructor(private dialog: MatDialog) {
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
