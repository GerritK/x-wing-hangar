import {Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UpgradeType} from '../../enums/upgrade-type.enum';
import {Upgrade} from '../../models/upgrade.model';
import {UpgradeProvider} from '../../providers/upgrade.provider';
import {Squadron} from '../../models/squadron.model';
import {SquadronShip} from '../../models/squadron-ship.model';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {RestrictionHelper} from '../../helpers/restriction.helper';

@Component({
  selector: 'xwh-upgrade-selector',
  templateUrl: './upgrade-selector.component.html',
  styleUrls: [
    './upgrade-selector.component.scss'
  ]
})
export class UpgradeSelectorComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  public readonly UpgradeType = UpgradeType;

  @Input() upgrade: Upgrade;
  @Output() upgradeChange: EventEmitter<Upgrade> = new EventEmitter();

  @Input() squadron: Squadron;
  @Input() squadronIndex: number;
  @Input() upgradeType: UpgradeType;

  public allUpgrades: any[] = [];

  private ngDestroy$: Subject<any> = new Subject();
  private initialized = false;

  private squadronCheck: string;

  constructor(private upgradeProv: UpgradeProvider, private translate: TranslateService) {
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

    if (this.upgradeType) {
      upgrades = upgrades.filter((upgrade) => {
        return upgrade.types.findIndex((type) => type === this.upgradeType) !== -1;
      });
    }

    upgrades = _.sortBy(upgrades, ['cost', (upgrade) => {
      return this.translate.instant('data.upgrades.' + upgrade.types[0] + '.' + upgrade.id + '.name');
    }]);

    this.allUpgrades = upgrades.map((upgrade) => {
      return {
        upgrade: upgrade,
        alreadyUsed: false
      };
    });

    this.updateUnavailable();
  }

  private updateUnavailable() {
    for (const option of this.allUpgrades) {
      option.notUseable = !RestrictionHelper.isUseable(this.squadronShip, option.upgrade);

      let used = false;

      if (option.upgrade.isUnique) {
        used = used || this.squadron.isUniqueUsed(option.upgrade.id);
      }

      if (option.upgrade.isLimited) {
        used = used || this.squadronShip.hasUpgradeEquipped(option.upgrade.id);
      }

      option.alreadyUsed = used;
    }

    console.log(this.allUpgrades);
  }
}
