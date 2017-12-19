import {Component, Input} from '@angular/core';
import {Pilot} from '../../models/pilot.model';

@Component({
  selector: 'xwh-pilot-name',
  templateUrl: './pilot-name.component.html',
  styleUrls: [
    './pilot-name.component.scss'
  ]
})
export class PilotNameComponent {
  @Input() pilot: Pilot;
}
