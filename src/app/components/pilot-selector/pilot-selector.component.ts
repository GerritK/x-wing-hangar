import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Pilot} from '../../models/pilot.model';
import {Ship} from '../../models/ship.model';
import {PilotProvider} from '../../providers/pilot.provider';
import {Faction} from '../../enums/faction.enum';

@Component({
  selector: 'xwh-pilot-selector',
  templateUrl: './pilot-selector.component.html',
  styleUrls: [
    './pilot-selector.component.scss'
  ]
})
export class PilotSelectorComponent implements OnChanges {
  @Input() pilot: Pilot;
  @Output() pilotChange: EventEmitter<Pilot> = new EventEmitter<Pilot>();

  @Input() ship: Ship;

  @Input() faction: Faction;

  public allPilots: Pilot[] = [];

  constructor(private pilotProv: PilotProvider) {
    pilotProv.allPilots.subscribe(() => {
      this.loadPilots();
    });
  }

  ngOnChanges() {
    this.loadPilots();
  }

  private loadPilots() {
    let pilots = this.pilotProv.getAll();

    if (this.ship != null) {
      pilots = pilots.filter((pilot) => pilot.shipId === this.ship.id);
    }

    if (this.faction != null) {
      pilots = pilots.filter((pilot) => pilot.faction === this.faction);
    }

    this.allPilots = pilots;
  }
}
