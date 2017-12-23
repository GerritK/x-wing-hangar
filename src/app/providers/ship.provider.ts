import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Ship} from '../models/ship.model';
import {Faction} from '../enums/faction.enum';

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
          const ship = Ship.fromData(result);

          if (data.findIndex((s) => s.id === ship.id) !== -1) {
            console.error('ship id "' + ship.id + '" already used');
          } else {
            data.push(ship);
          }
        }

        this._allShips.next(data);
      });
  }

  public getAll() {
    return this._allShips.getValue();
  }

  public getByFaction(faction: Faction) {
    return this._allShips.getValue().filter((ship) => {
      return ship.factions.findIndex((f) => f === faction) !== -1;
    });
  }

  public getById(id: string) {
    return this._allShips.getValue().find((ship) => ship.id === id);
  }
}
