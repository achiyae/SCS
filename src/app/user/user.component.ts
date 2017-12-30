import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../shared/orm.service';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() email: string;

  constructor(private db: OrmService) { }

  ngOnInit() {
  }

  onLogin() {
    this.db.getUser(this.email);
  }
}
