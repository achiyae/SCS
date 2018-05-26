import {Component, Input, OnInit} from '@angular/core';

import User from '../models/user.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;

  constructor(private orm: OrmService) {
    this.user = this.orm.get_current_user();
    this.orm.userChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }
}
