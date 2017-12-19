import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {ShipProvider} from '../../providers/ship.provider';
import {Faction} from '../../enums/faction.enum';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'xwh-ship-selector',
  templateUrl: './ship-selector.component.html',
  styleUrls: [
    './ship-selector.component.scss'
  ]
})
export class ShipSelectorComponent implements OnChanges, OnDestroy {
  @Input() ship: Ship;
  @Output() shipChange: EventEmitter<Ship> = new EventEmitter<Ship>();

  @Input() faction: Faction;

  public allShips: Ship[] = [];

  private ngDestroy$: Subject<any> = new Subject();

  constructor(private shipProv: ShipProvider) {
    this.shipProv.allShips
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
        this.loadShips();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.faction) {
      this.loadShips();
    }
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private loadShips() {
    this.allShips = this.shipProv.getByFaction(this.faction);
  }
}
