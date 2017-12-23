import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Expansion} from '../models/expansion.model';
import {ShipProvider} from './ship.provider';
import {PilotProvider} from './pilot.provider';
import {UpgradeProvider} from './upgrade.provider';

@Injectable()
export class ExpansionProvider {
  private _allExpansions: BehaviorSubject<Expansion[]> = new BehaviorSubject([]);

  public allExpansions: Observable<Expansion[]> = this._allExpansions.asObservable();

  constructor(private http: HttpClient,
              private shipProv: ShipProvider,
              private pilotProv: PilotProvider,
              private upgradeProv: UpgradeProvider) {
  }

  public load(): Observable<any> {
    console.log('loading expansions...');

    return Observable.create((observer) => {
      this.http.get('assets/data/expansions.json')
        .subscribe((results: any[]) => {
          const data = [];

          for (const result of results) {
            const expansion = Expansion.fromData(result);

            this.confirmExpansion(expansion);

            if (data.findIndex((u) => u.id === expansion.id) !== -1) {
              console.error('expansion id "' + expansion.id + '" already used');
            } else {
              data.push(expansion);
            }
          }

          console.log('successfully loaded ' + data.length + ' expansions');

          this._allExpansions.next(data);

          observer.next();
          observer.complete();
        });
    });
  }

  public getAll() {
    return this._allExpansions.getValue();
  }

  public getById(id: string) {
    return this._allExpansions.getValue().find((expansion) => expansion.id === id);
  }

  private confirmExpansion(expansion: Expansion) {
    for (const ship of expansion.shipIds) {
      if (this.shipProv.getById(ship) == null) {
        console.warn('no ship with id "' + ship + '" loaded');
      }
    }

    for (const pilot of expansion.pilotIds) {
      if (this.pilotProv.getById(pilot) == null) {
        console.warn('no pilot with id "' + pilot + '" loaded');
      }
    }

    for (const upgrade of expansion.upgradeIds) {
      if (this.upgradeProv.getById(upgrade) == null) {
        console.warn('no upgrade with id "' + upgrade + '" loaded');
      }
    }
  }
}
