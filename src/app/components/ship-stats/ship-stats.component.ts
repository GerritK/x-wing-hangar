import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Pilot} from '../../models/pilot.model';
import {ShipStats} from '../../models/ship-stats.model';
import {ShipStatsHelper} from '../../helpers/ship-stats.helper';

@Component({
  selector: 'xwh-ship-stats',
  templateUrl: './ship-stats.component.html',
  styleUrls: [
    './ship-stats.component.scss'
  ]
})
export class ShipStatsComponent implements OnInit, OnChanges {
  @Input() ship: Ship;
  @Input() pilot: Pilot;

  public stats: ShipStats;

  private initialized = false;

  ngOnInit() {
    this.initialized = true;

    this.updateShipStats();
  }

  ngOnChanges() {
    if (this.initialized) {
      this.updateShipStats();
    }
  }

  private updateShipStats() {
    this.stats = ShipStatsHelper.getShipStats(this.ship, this.pilot);
  }
}
