import {Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UpgradeType} from '../../enums/upgrade-type.enum';
import {Upgrade} from '../../models/upgrade.model';
import {UpgradeProvider} from '../../providers/upgrade.provider';
import {Squadron} from '../../models/squadron.model';
import {SquadronShip} from '../../models/squadron-ship.model';

@Component({
  selector: 'xwh-upgrade-selector',
  templateUrl: './upgrade-selector.component.html',
  styleUrls: [
    './upgrade-selector.component.scss'
  ]
})
export class UpgradeSelectorComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() upgrade: Upgrade;
  @Output() upgradeChange: EventEmitter<Upgrade> = new EventEmitter();

  @Input() squadron: Squadron;
  @Input() squadronIndex: number;
  @Input() upgradeType: UpgradeType;
  @Input() upgradeIndex: number;

  public allUpgrades: any[] = [];

  private ngDestroy$: Subject<any> = new Subject();
  private initialized = false;

  private squadronCheck: string;

  constructor(private upgradeProv: UpgradeProvider) {
  }

  ngOnInit() {
    this.initialized = true;
    this.squadronCheck = JSON.stringify(this.squadron);

    this.loadUpgrades();

    this.upgradeProv.allUpgrades
      .takeUntil(this.ngDestroy$)
      .subscribe(() => {
        this.loadUpgrades();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      if (changes.upgradeType) {
        this.loadUpgrades();
      } else if (changes.squadron || changes.squadronIndex) {
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
      // this.loadUpgrades();
      this.updateUnavailable();
      this.squadronCheck = JSON.stringify(this.squadron);
    }
  }

  public get squadronShip(): SquadronShip {
    return this.squadron.ships[this.squadronIndex];
  }

  private loadUpgrades() {
    let upgrades = this.upgradeProv.getAll();

    // TODO: filter by given data

    if (this.upgradeType) {
      upgrades = upgrades.filter((upgrade) => {
        let keep = true;

        keep = keep && upgrade.types.findIndex((type) => type === this.upgradeType) !== -1;

        return keep;
      });
    }

    this.allUpgrades = upgrades.map((upgrade) => {
      return {
        upgrade: upgrade,
        alreadyUsed: false
      };
    });

    this.updateUnavailable();
  }

  private updateUnavailable() {
    for (const upgrade of this.allUpgrades) {
      let used = false;

      if (upgrade.upgrade.isUnique) {
        used = used || this.squadron.isUniqueUsed(upgrade.upgrade.id, this.squadronIndex);
      }

      if (upgrade.upgrade.isLimited) {
        used = used || this.squadronShip.hasUpgradeEquipped(upgrade.upgrade.id, this.upgradeIndex);
      }

      upgrade.alreadyUsed = used;
    }
  }
}
