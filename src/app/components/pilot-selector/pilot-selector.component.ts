import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Pilot} from '../../models/pilot.model';
import {Ship} from '../../models/ship.model';
import {PilotProvider} from '../../providers/pilot.provider';
import {Faction} from '../../enums/faction.enum';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'xwh-pilot-selector',
  templateUrl: './pilot-selector.component.html',
  styleUrls: [
    './pilot-selector.component.scss'
  ]
})
export class PilotSelectorComponent implements OnChanges, OnDestroy {
  @Input() pilot: Pilot;
  @Output() pilotChange: EventEmitter<Pilot> = new EventEmitter<Pilot>();

  @Input() ship: Ship;

  @Input() faction: Faction;

  public allPilots: Pilot[] = [];

  private ngDestroy$: Subject<any> = new Subject();

  constructor(private pilotProv: PilotProvider) {
    pilotProv.allPilots
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
      this.loadPilots();
    });
  }

  ngOnChanges() {
    this.loadPilots();
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
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
