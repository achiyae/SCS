import {Component, Input, OnInit} from '@angular/core';

import PopulatedUser from '../models/populatedUser.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: PopulatedUser;

  constructor(private orm: OrmService) {
    this.user = this.orm.getCurrentUser();
    this.orm.userChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }
}
