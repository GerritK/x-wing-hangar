import {Component, Input} from '@angular/core';
import {Ship} from '../../models/ship.model';
import {Pilot} from '../../models/pilot.model';

@Component({
  selector: 'xwh-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: [
    './action-bar.component.scss'
  ]
})
export class ActionBarComponent {
  @Input() ship: Ship;
  @Input() pilot: Pilot;
}
