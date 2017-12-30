import {Component} from '@angular/core';
import {OrmService} from './shared/orm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OrmService]
})
export class AppComponent {
  constructor(private db: OrmService) { }
}
