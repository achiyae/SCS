import {Component, Input, Output} from '@angular/core';
import {OrmService} from './shared/orm.service';
import * as orm from 'orm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OrmService]
})
export class AppComponent {
  private user: orm.model;

  constructor(private ormService: OrmService) { }

  userChanged(user: orm.model) {
    this.user = user;
  }
}
