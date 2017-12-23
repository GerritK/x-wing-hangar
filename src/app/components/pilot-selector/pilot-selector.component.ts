import {Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Pilot} from '../../models/pilot.model';
import {Ship} from '../../models/ship.model';
import {PilotProvider} from '../../providers/pilot.provider';
import {Faction} from '../../enums/faction.enum';
import {Subject} from 'rxjs/Subject';
import {Squadron} from '../../models/squadron.model';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'xwh-pilot-selector',
  templateUrl: './pilot-selector.component.html',
  styleUrls: [
    './pilot-selector.component.scss'
  ]
})
export class PilotSelectorComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() pilot: Pilot;
  @Output() pilotChange: EventEmitter<Pilot> = new EventEmitter<Pilot>();

  @Input() ship: Ship;
  @Input() faction: Faction;
  @Input() squadron: Squadron;

  public allPilots: any[] = [];

  private ngDestroy$: Subject<any> = new Subject();
  private initialized = false;

  private squadronCheck;

  constructor(private pilotProv: PilotProvider,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.initialized = true;
    this.squadronCheck = JSON.stringify(this.squadron);

    this.loadPilots();

    this.pilotProv.allPilots
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
        this.loadPilots();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      if (changes.ship || changes.faction) {
        this.loadPilots();
      } else if (changes.squadron) {
        this.squadronCheck = JSON.stringify(this.squadron);
        this.updateUnavailable();
      }
    }
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ngDoCheck() {
    if (JSON.stringify(this.squadron) !== this.squadronCheck) {
      this.updateUnavailable();
    }
  }

  private loadPilots() {
    let pilots = this.pilotProv.getAll();

    if (this.ship != null) {
      pilots = pilots.filter((pilot) => pilot.shipId === this.ship.id);
    }

    if (this.faction != null) {
      pilots = pilots.filter((pilot) => pilot.faction === this.faction);
    }

    pilots = _.sortBy(pilots, ['cost', (pilot) => {
      return this.translate.instant('data.pilots.' + pilot.id + '.name');
    }]);

    this.allPilots = pilots.map((pilot) => {
      return {
        pilot: pilot,
        alreadyUsed: false
      };
    });
    this.updateUnavailable();
  }

  private updateUnavailable() {
    for (const pilot of this.allPilots) {
      if (pilot.pilot.isUnique) {
        pilot.alreadyUsed = this.squadron.isUniqueUsed(pilot.pilot.id);
      }
    }
  }
}
