import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Pilot} from '../models/pilot.model';
import {Observable} from 'rxjs/Observable';
import {ShipProvider} from './ship.provider';

@Injectable()
export class PilotProvider {
  private _allPilots: BehaviorSubject<Pilot[]> = new BehaviorSubject([]);

  public allPilots: Observable<Pilot[]> = this._allPilots.asObservable();

  constructor(private http: HttpClient,
              private shipProv: ShipProvider) {
  }

  public load(): Observable<any> {
    console.log('loading pilots...');

    return Observable.create((observer) => {
      this.http.get('assets/data/pilots.json')
        .subscribe((results: any[]) => {
          const data = [];

          for (const result of results) {
            const pilot = Pilot.fromData(result);

            if (this.shipProv.getById(pilot.shipId) == null) {
              console.warn('no ship with id "' + pilot.shipId + '" loaded.');
            }

            if (data.findIndex((p) => p.id === pilot.id) !== -1) {
              console.error('pilot id "' + pilot.id + '" already used');
            } else {
              data.push(pilot);
            }
          }

          console.log('successfully loaded ' + data.length + ' pilots');

          this._allPilots.next(data);

          observer.next();
          observer.complete();
        });
    });
  }

  public getAll() {
    return this._allPilots.getValue();
  }

  public getById(id: string) {
    return this._allPilots.getValue().find((pilot) => pilot.id === id);
  }

  public getByShipId(shipId: string) {
    return this._allPilots.getValue().filter((pilot) => pilot.shipId === shipId);
  }
}
