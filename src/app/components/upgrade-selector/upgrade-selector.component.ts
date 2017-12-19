import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Pilot} from '../../models/pilot.model';
import {Ship} from '../../models/ship.model';
import {Faction} from '../../enums/faction.enum';
import {Subject} from 'rxjs/Subject';
import {UpgradeType} from '../../enums/upgrade-type.enum';
import {Upgrade} from '../../models/upgrade.model';
import {UpgradeProvider} from '../../providers/upgrade.provider';

@Component({
  selector: 'xwh-upgrade-selector',
  templateUrl: './upgrade-selector.component.html',
  styleUrls: [
    './upgrade-selector.component.scss'
  ]
})
export class UpgradeSelectorComponent implements OnChanges, OnDestroy {
  @Input() upgrade: Upgrade;
  @Output() upgradeChange: EventEmitter<Upgrade> = new EventEmitter();

  @Input() pilot: Pilot;
  @Input() ship: Ship;
  @Input() faction: Faction;
  @Input() upgradeType: UpgradeType;

  public allUpgrades: Upgrade[] = [];

  private ngDestroy$: Subject<any> = new Subject();

  constructor(private upgradeProv: UpgradeProvider) {
    upgradeProv.allUpgrades
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
        this.loadUpgrades();
      });
  }

  ngOnChanges() {
    this.loadUpgrades();
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  private loadUpgrades() {
    let upgrades = this.upgradeProv.getAll();

    // TODO: filter by given data

    if (this.upgradeType) {
      upgrades = upgrades.filter((upgrade) => {
        return upgrade.types.findIndex((type) => type === this.upgradeType) !== -1;
      });
    }

    this.allUpgrades = upgrades;
  }
}
