import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Pilot} from '../models/pilot.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PilotProvider {
  private _allPilots: BehaviorSubject<Pilot[]> = new BehaviorSubject([]);

  public allPilots: Observable<Pilot[]> = this._allPilots.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  public load() {
    this.http.get('assets/data/pilots.json')
      .subscribe((results: any[]) => {
        const data = [];

        for (const result of results) {
          const pilot = Pilot.fromData(result);

          if (data.findIndex((p) => p.id === pilot.id) !== -1) {
            console.error('pilot id "' + pilot.id + '" already used');
          } else {
            data.push(pilot);
          }
        }

        this._allPilots.next(data);
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
