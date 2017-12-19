import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {ShipProvider} from '../../providers/ship.provider';
import {Faction} from '../../enums/faction.enum';

@Component({
  selector: 'xwh-ship-selector',
  templateUrl: './ship-selector.component.html',
  styleUrls: [
    './ship-selector.component.scss'
  ]
})
export class ShipSelectorComponent implements OnChanges {
  @Input() ship: Ship;
  @Output() shipChange: EventEmitter<Ship> = new EventEmitter<Ship>();

  @Input() faction: Faction;

  public allShips: Ship[] = [];

  constructor(private shipProv: ShipProvider) {
    this.shipProv.allShips.subscribe(() => {
      this.loadShips();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.faction) {
      this.loadShips();
    }
  }

  private loadShips() {
    this.allShips = this.shipProv.getByFaction(this.faction);
  }
}
