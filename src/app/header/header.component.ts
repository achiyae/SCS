import {Component, Input, OnInit} from '@angular/core';
import {User, OrmService, Requirement} from '../shared/orm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;

  constructor(private orm: OrmService) {
    this.user = this.orm.user;
    this.orm.userChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }
}
