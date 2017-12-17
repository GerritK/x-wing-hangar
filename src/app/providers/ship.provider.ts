import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Ship} from '../models/ship.model';

@Injectable()
export class ShipProvider {
  private _allShips: BehaviorSubject<Ship[]> = new BehaviorSubject([]);

  public allShips: Observable<Ship[]> = this._allShips.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  public load() {
    this.http.get('assets/data/ships.json')
      .subscribe((results: any[]) => {
        const data = [];

        for (const result of results) {
          data.push(Ship.fromData(result));
        }

        this._allShips.next(data);
      });
  }

  public getById(id: string) {
    return this._allShips.getValue().find((ship) => ship.id === id);
  }
}
