import {Component, Input} from '@angular/core';
import {Ship} from '../../models/ship.model';

@Component({
  selector: 'xwh-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: [
    './maneuver.component.scss'
  ]
})
export class ManeuverComponent {
  @Input() ship: Ship;
}
