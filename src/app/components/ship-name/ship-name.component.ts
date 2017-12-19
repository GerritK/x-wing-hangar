import {Component, Input} from '@angular/core';
import {Ship} from '../../models/ship.model';

@Component({
  selector: 'xwh-ship-name',
  templateUrl: './ship-name.component.html',
  styleUrls: [
    './ship-name.component.scss'
  ]
})
export class ShipNameComponent {
  @Input() ship: Ship;
}
