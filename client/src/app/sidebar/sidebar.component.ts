import { Component, OnInit } from '@angular/core';
import { OrmService } from '../services/orm.service';
import User from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private user: User;

  constructor(private orm: OrmService) {
    this.orm.userChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

}
