import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Pilot} from '../models/pilot.model';
import {Observable} from 'rxjs/Observable';
import {Upgrade} from '../models/upgrade.model';

@Injectable()
export class UpgradeProvider {
  private _allUpgrades: BehaviorSubject<Upgrade[]> = new BehaviorSubject([]);

  public allUpgrades: Observable<Upgrade[]> = this._allUpgrades.asObservable();

  constructor(private http: HttpClient) {
  }

  public load(): Observable<any> {
    console.log('loading upgrades...');

    return Observable.create((observer) => {
      this.http.get('assets/data/upgrades.json')
        .subscribe((results: any[]) => {
          const data = [];

          for (const result of results) {
            const upgrade = Upgrade.fromData(result);

            if (data.findIndex((u) => u.id === upgrade.id) !== -1) {
              console.error('upgrade id "' + upgrade.id + '" already used');
            } else {
              data.push(upgrade);
            }
          }

          console.log('successfully loaded ' + data.length + ' upgrades');

          this._allUpgrades.next(data);

          observer.next();
          observer.complete();
        });
    });
  }

  public getAll() {
    return this._allUpgrades.getValue();
  }

  public getById(id: string) {
    return this._allUpgrades.getValue().find((upgrade) => upgrade.id === id);
  }
}
