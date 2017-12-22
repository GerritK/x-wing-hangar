import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {ShipProvider} from '../../providers/ship.provider';
import {Faction} from '../../enums/faction.enum';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
  selector: 'xwh-ship-selector',
  templateUrl: './ship-selector.component.html',
  styleUrls: [
    './ship-selector.component.scss'
  ]
})
export class ShipSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ship: Ship;
  @Output() shipChange: EventEmitter<Ship> = new EventEmitter<Ship>();

  @Input() faction: Faction;

  public allShips: Ship[] = [];

  private ngDestroy$: Subject<any> = new Subject();
  private initialized = false;

  constructor(private shipProv: ShipProvider) {
  }

  ngOnInit() {
    this.initialized = true;

    this.loadShips();

    this.shipProv.allShips
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
        this.loadShips();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      if (changes.faction) {
        this.loadShips();
      }
    }
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private loadShips() {
    this.allShips = this.shipProv.getByFaction(this.faction);

    // TODO: sort by translated string instead of id
    this.allShips = _.sortBy(this.allShips, ['cost', 'id']);
  }
}
