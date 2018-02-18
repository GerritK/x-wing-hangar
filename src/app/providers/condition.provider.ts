import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Condition} from '../models/condition.model';
import {PilotProvider} from './pilot.provider';
import {UpgradeProvider} from './upgrade.provider';

@Injectable()
export class ConditionProvider {
  private _allConditions: BehaviorSubject<Condition[]> = new BehaviorSubject([]);

  public allConditions: Observable<Condition[]> = this._allConditions.asObservable();

  constructor(private http: HttpClient,
              private pilotProv: PilotProvider,
              private upgradeProv: UpgradeProvider) {
  }

  public load(): Observable<any> {
    console.log('loading conditions...');

    return Observable.create((observer) => {
      this.http.get('assets/data/conditions.json')
        .subscribe((results: any[]) => {
          const data = [];

          for (const result of results) {
            const condition = Condition.fromData(result);

            for (const pilotId of condition.pilots) {
              if (this.pilotProv.getById(pilotId) == null) {
                console.warn('no pilot with id "' + pilotId + '" loaded.');
              }
            }

            for (const upgradeId of condition.upgrades) {
              if (this.upgradeProv.getById(upgradeId) == null) {
                console.warn('no upgrade with id "' + upgradeId + '" loaded.');
              }
            }

            if (data.findIndex((c) => c.id === condition.id) !== -1) {
              console.error('condition id "' + condition.id + '" already used');
            } else {
              data.push(condition);
            }
          }

          console.log('successfully loaded ' + data.length + ' conditions');

          this._allConditions.next(data);

          observer.next();
          observer.complete();
        });
    });
  }

  public getAll() {
    return this._allConditions.getValue();
  }

  public getById(id: string) {
    return this._allConditions.getValue().find((condition) => condition.id === id);
  }

  public getByUpgrade(upgradeId: string) {
    return this._allConditions.getValue().find((condition) => {
      return condition.upgrades.findIndex((upgrade) => upgrade === upgradeId) !== -1;
    });
  }

  public getByPilot(pilotId: string) {
    return this._allConditions.getValue().find((condition) => {
      return condition.pilots.findIndex((pilot) => pilot === pilotId) !== -1;
    });
  }
}
